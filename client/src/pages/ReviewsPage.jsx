import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import ReviewList from '../components/reviews/ReviewList'
import ReviewForm from '../components/reviews/ReviewForm'

function ReviewsPage() {
  const [showForm, setShowForm] = useState(false)
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (review) => {
    setReviewToEdit(review)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setReviewToEdit(null)
  }

  const canReview = user?.role === 'patient' || user?.role === 'admin'

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>Reviews</h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {user?.role === 'patient' && 'Share your experience with our staff'}
              {user?.role === 'admin' && 'View and manage all staff reviews'}
              {user?.role === 'doctor' && 'View reviews from patients'}
            </p>
          </div>
          {canReview && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Write Review
            </button>
          )}
        </div>

        <ReviewList onEdit={handleEdit} />

        {showForm && (
          <ReviewForm reviewToEdit={reviewToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default ReviewsPage