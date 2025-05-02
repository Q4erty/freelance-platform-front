// RatingModal.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RatingModal({ orderId, onClose, onRate }) {
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8000/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    score,
                    comment
                }),
                credentials: 'include'
            });
            onRate();
            toast.success('Rating submitted!');
            onClose();
        } catch (err) {
            toast.error('Failed to submit rating');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Rate Order #{orderId}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Rating (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-control"
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit Rating
                    </button>
                </form>
            </div>
        </div>
    );
}