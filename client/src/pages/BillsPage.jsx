import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import BillList from '../components/bills/BillList'
import BillForm from '../components/bills/BillForm'

function BillsPage() {
  const [showForm, setShowForm] = useState(false)
  const [billToEdit, setBillToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (bill) => {
    setBillToEdit(bill)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setBillToEdit(null)
  }

  const canCreate = user?.role === 'admin' || user?.role === 'receptionist'

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>
              {user?.role === 'patient' ? 'My Bills' : 'Bills'}
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {user?.role === 'patient'
                ? 'View your billing history'
                : 'Generate and manage patient bills'}
            </p>
          </div>
          {canCreate && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Generate Bill
            </button>
          )}
        </div>

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <BillList onEdit={handleEdit} />
        </div>

        {showForm && (
          <BillForm billToEdit={billToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default BillsPage