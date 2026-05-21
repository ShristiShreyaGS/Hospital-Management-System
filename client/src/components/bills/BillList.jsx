import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBills, deleteBill } from '../../features/bills/billSlice'
import PaymentModal from './PaymentModal'

function BillList({ onEdit }) {
  const dispatch = useDispatch()
  const { bills, isLoading } = useSelector((state) => state.bills)
  const { user } = useSelector((state) => state.auth)
  const [payingBill, setPayingBill] = useState(null)

  useEffect(() => {
    dispatch(getBills())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this bill?')) dispatch(deleteBill(id))
  }

  const statusColor = {
    Unpaid: '#e67e22',
    Paid: '#27ae60',
    Partial: '#2980b9',
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading bills...</p>

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c3e50', color: 'white' }}>
              <th style={th}>Patient</th>
              <th style={th}>Doctor</th>
              <th style={th}>Items</th>
              <th style={th}>Amount</th>
              <th style={th}>Mode</th>
              <th style={th}>Status</th>
              <th style={th}>Date</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                  No bills found
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr key={bill._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={td}>{bill.patientId?.userId?.name || 'N/A'}</td>
                  <td style={td}>Dr. {bill.doctorId?.userId?.name || 'N/A'}</td>
                  <td style={td}>
                    {bill.items?.map((item, i) => (
                      <div key={i} style={{ fontSize: '12px' }}>
                        {item.name} — ₹{item.amount}
                      </div>
                    ))}
                  </td>
                  <td style={{ ...td, fontWeight: '600', color: '#2c3e50' }}>
                    ₹{bill.amount}
                  </td>
                  <td style={td}>{bill.paymentMode || 'N/A'}</td>
                  <td style={td}>
                    <span style={{
                      background: statusColor[bill.paymentStatus] || '#95a5a6',
                      color: 'white', padding: '3px 10px',
                      borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                    }}>
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td style={td}>
                    {bill.paymentDate
                      ? new Date(bill.paymentDate).toLocaleDateString('en-IN')
                      : new Date(bill.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td style={td}>
                    {/* Edit + Delete — admin and receptionist */}
                    {(user?.role === 'admin' || user?.role === 'receptionist') && (
                      <>
                        <button onClick={() => onEdit(bill)}
                          style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button onClick={() => handleDelete(bill._id)}
                            style={{ ...btn, background: '#e74c3c', marginRight: '6px' }}>
                            Delete
                          </button>
                        )}
                      </>
                    )}

                    {/* Pay Now — unpaid/partial bills, visible to patient, receptionist, admin */}
                    {bill.paymentStatus !== 'Paid' && (
                      user?.role === 'patient' ||
                      user?.role === 'admin' ||
                      user?.role === 'receptionist'
                    ) && (
                      <button onClick={() => setPayingBill(bill)}
                        style={{ ...btn, background: '#27ae60' }}>
                        Pay Now
                      </button>
                    )}

                    {/* Paid badge — no actions */}
                    {bill.paymentStatus === 'Paid' && (
                      <span style={{ color: '#27ae60', fontWeight: '600', fontSize: '13px' }}>
                        ✓ Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {payingBill && (
        <PaymentModal
          bill={payingBill}
          onClose={() => setPayingBill(null)}
          onSuccess={() => {
            setPayingBill(null)
            dispatch(getBills()) // refresh list after payment
          }}
        />
      )}
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default BillList