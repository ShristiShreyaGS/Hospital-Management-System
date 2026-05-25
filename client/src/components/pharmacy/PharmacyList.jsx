import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMedicines, deleteMedicine } from '../../features/pharmacy/pharmacySlice'

function PharmacyList({ onEdit }) {
  const dispatch = useDispatch()
  const { medicines, isLoading } = useSelector((state) => state.pharmacy)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMedicines())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this medicine?')) dispatch(deleteMedicine(id))
  }

  const getStockStatus = (stock, lowStockAlert) => {
    if (stock === 0) return { label: 'Out of Stock', color: '#e74c3c' }
    if (stock <= lowStockAlert) return { label: 'Low Stock', color: '#e67e22' }
    return { label: 'In Stock', color: '#27ae60' }
  }

  const getExpiryStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return { label: 'Expired', color: '#e74c3c' }
    if (diffDays <= 30) return { label: `Expires in ${diffDays}d`, color: '#e67e22' }
    return { label: expiry.toLocaleDateString('en-IN'), color: '#27ae60' }
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading medicines...</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={th}>Medicine Name</th>
            <th style={th}>Category</th>
            <th style={th}>Manufacturer</th>
            <th style={th}>Stock</th>
            <th style={th}>Price</th>
            <th style={th}>Expiry</th>
            <th style={th}>Status</th>
            {(user?.role === 'admin' || user?.role === 'pharmacist') && (
              <th style={th}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                No medicines found
              </td>
            </tr>
          ) : (
            medicines.map((med) => {
              const stockStatus = getStockStatus(med.stock, med.lowStockAlert)
              const expiryStatus = getExpiryStatus(med.expiryDate)
              return (
                <tr key={med._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={{ ...td, fontWeight: '500' }}>{med.medicineName}</td>
                  <td style={td}>{med.category}</td>
                  <td style={td}>{med.manufacturer}</td>
                  <td style={td}>
                    <span style={{ fontWeight: '600', color: stockStatus.color }}>
                      {med.stock}
                    </span>
                    <span style={{ color: '#7f8c8d', fontSize: '12px' }}>
                      {' '}(alert: {med.lowStockAlert})
                    </span>
                  </td>
                  <td style={td}>₹{med.price}</td>
                  <td style={td}>
                    <span style={{ color: expiryStatus.color, fontSize: '13px' }}>
                      {expiryStatus.label}
                    </span>
                  </td>
                  <td style={td}>
                    <span style={{
                      background: stockStatus.color,
                      color: 'white', padding: '3px 10px',
                      borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                    }}>
                      {stockStatus.label}
                    </span>
                  </td>
                  {(user?.role === 'admin' || user?.role === 'pharmacist') && (
                    <td style={td}>
                      <button onClick={() => onEdit(med)}
                        style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                        Edit
                      </button>
                      {user?.role === 'admin' && (
                        <button onClick={() => handleDelete(med._id)}
                          style={{ ...btn, background: '#e74c3c' }}>
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default PharmacyList