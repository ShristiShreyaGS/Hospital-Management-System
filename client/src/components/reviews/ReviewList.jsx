import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews, deleteReview } from '../../features/reviews/reviewSlice'

function ReviewList({ onEdit }) {
  const dispatch = useDispatch()
  const { reviews, isLoading } = useSelector((state) => state.reviews)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) dispatch(deleteReview(id))
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const categoryColor = {
    'Professionalism': '#2980b9',
    'Communication': '#27ae60',
    'Treatment Quality': '#8e44ad',
    'Punctuality': '#e67e22',
    'General': '#95a5a6',
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading reviews...</p>

  return (
    <div>
      {reviews.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No reviews found
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reviews.map((review) => (
            <div key={review._id} style={{
              background: 'white', borderRadius: '8px',
              padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              borderLeft: `4px solid ${categoryColor[review.category] || '#95a5a6'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  {/* Staff name */}
                  <h4 style={{ color: '#2c3e50', margin: '0 0 4px', fontSize: '15px' }}>
                    {review.staffId?.userId?.name || 'Unknown Staff'}
                    <span style={{ color: '#7f8c8d', fontWeight: '400', fontSize: '13px' }}>
                      {' '}— {review.staffId?.position || ''}
                    </span>
                  </h4>

                  {/* Rating stars */}
                  <div style={{ color: '#f39c12', fontSize: '18px', marginBottom: '8px' }}>
                    {renderStars(review.rating)}
                    <span style={{ color: '#7f8c8d', fontSize: '13px', marginLeft: '8px' }}>
                      ({review.rating}/5)
                    </span>
                  </div>

                  {/* Category badge */}
                  <span style={{
                    background: categoryColor[review.category] || '#95a5a6',
                    color: 'white', padding: '2px 10px',
                    borderRadius: '12px', fontSize: '12px',
                    marginBottom: '10px', display: 'inline-block'
                  }}>
                    {review.category}
                  </span>

                  {/* Comment */}
                  {review.comment && (
                    <p style={{ color: '#2c3e50', fontSize: '14px', margin: '10px 0 0', lineHeight: '1.5' }}>
                      "{review.comment}"
                    </p>
                  )}

                  {/* Reviewer */}
                  <p style={{ color: '#95a5a6', fontSize: '12px', margin: '8px 0 0' }}>
                    By: {review.isAnonymous ? 'Anonymous' : review.reviewerId?.name || 'Unknown'}
                    {' • '}
                    {new Date(review.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {(user?.role === 'admin' ||
                    review.reviewerId?._id === user?.id) && (
                    <>
                      <button onClick={() => onEdit(review)}
                        style={{ ...btn, background: '#2980b9' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(review._id)}
                        style={{ ...btn, background: '#e74c3c' }}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default ReviewList