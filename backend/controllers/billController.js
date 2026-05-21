const Bill = require('../models/Bill');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const populateBill = (query) => query
  .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
  .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' }, select: 'userId specialization' })

const addBill = async (req, res) => {
  try {
    const { patientId, doctorId, items, amount, paymentMode, paymentStatus, paymentDate } = req.body;

    const bill = await Bill.create({
      patientId, doctorId, items, amount, paymentMode, paymentStatus, paymentDate
    });

    const populated = await populateBill(Bill.findById(bill._id))
    res.status(201).json({ message: 'Bill created successfully', bill: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBills = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    let filter = {};

    if (role === 'patient') {
      // ✅ Look up Patient._id from userId — same fix as appointments
      const patient = await Patient.findOne({ userId });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      filter.patientId = patient._id;
    }

    if (role === 'doctor') {
      // ✅ Look up Doctor._id from userId
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
      filter.doctorId = doctor._id;
    }

    // admin and receptionist — filter stays {} so they see all bills

    const bills = await populateBill(Bill.find(filter).sort({ createdAt: -1 }))
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    const bill = await populateBill(Bill.findById(req.params.id))
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    // Access control — patient can only see their own bill
    if (role === 'patient') {
      const patient = await Patient.findOne({ userId });
      if (!patient || bill.patientId._id.toString() !== patient._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    // Doctor can only see bills linked to them
    if (role === 'doctor') {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor || bill.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const bill = await populateBill(
      Bill.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true })
    )
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json({ message: 'Bill updated successfully', bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBill, getAllBills, getBillById, updateBill, deleteBill };