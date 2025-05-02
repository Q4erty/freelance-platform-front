import { useState, useEffect } from 'react';


export default function UserRatings({ userId, title = 'My Reviews' }) {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) return;
  
      const fetchRatings = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/ratings/${userId}/ratings`,
            { credentials: 'include' }
          );
          if (!response.ok) throw new Error('Failed to load ratings');
          const data = await response.json();
          setRatings(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRatings();
    }, [userId]);
  
    if (loading) return <div className="loading">Loading reviews...</div>;
    if (error) return <div className="error">Error: {error}</div>;
  
    return (
      <div className="ratings-container">
        <h3>Reviews</h3>
        {ratings.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <div className="ratings-list">
            {ratings.map(rating => (
              <div key={rating.id} className="rating-item">
                <div className="rating-header">
                  <span className="stars">
                    {'★'.repeat(rating.score)}{'☆'.repeat(5 - rating.score)}
                  </span>
                  <span className="date">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment">{rating.comment}</p>
                <div className="author">
                  From: {rating.fromUser} (Order: {rating.orderTitle})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  