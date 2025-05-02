import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('User not found');
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [userId]);

  if (loading) return <div className="text-center my-4">Loading...</div>;
  if (!user) return <div className="alert alert-danger">User not found</div>;

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                src={`http://localhost:8000/avatars/${user.avatarPath}`}
                className="img-fluid rounded-circle mb-3"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                alt="User avatar"
              />
            </div>
            <div className="col-md-8">
              <h2 className="mb-3">{user.username}</h2>
              <dl className="row">
                <dt className="col-sm-3">Email:</dt>
                <dd className="col-sm-9">{user.email}</dd>

                <dt className="col-sm-3">Role:</dt>
                <dd className="col-sm-9 text-capitalize">{user.role.toLowerCase()}</dd>

                <dt className="col-sm-3">Status:</dt>
                <dd className="col-sm-9">
                  <span className={`badge ${user.isBlocked ? 'bg-danger' : 'bg-success'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </dd>

                <dt className="col-sm-3">Rating:</dt>
                <dd className="col-sm-9">
                  {user.averageRating} ({user.ratingCount} reviews)
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}