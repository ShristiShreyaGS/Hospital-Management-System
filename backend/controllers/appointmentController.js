const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const addAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, reason } = req.body;
    const { role, id: userId } = req.user;

    let resolvedPatientId = patientId;
    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      resolvedPatientId = patient._id;
    }

    if (!resolvedPatientId || !doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const appointment = await Appointment.create({
      patientId: resolvedPatientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    });

    const populated = await Appointment.findById(appointment._id)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' }, select: 'userId specialization' });

    res.status(201).json({ message: 'Appointment booked successfully', appointment: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    let filter = {};

    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      filter = { patientId: patient._id };
    } else if (role === 'doctor') {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
      filter = { doctorId: doctor._id };
    }

    const appointments = await Appointment.find(filter)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' }, select: 'userId specialization' })
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    const appointment = await Appointment.findById(req.params.id)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' }, select: 'userId specialization' });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient || appointment.patientId._id.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    if (role === 'doctor') {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || appointment.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    const existing = await Appointment.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient || existing.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    if (role === 'doctor') {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || existing.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    )
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' }, select: 'userId specialization' });

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    const existing = await Appointment.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role === 'doctor') {
      return res.status(403).json({ message: 'Doctors cannot delete appointments' });
    }

    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient || existing.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};