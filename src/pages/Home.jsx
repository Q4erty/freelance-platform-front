import { useSelector } from 'react-redux';
import UserRatings from '../components/UserRatings';

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container py-4">
      {user ? (
        <div className="card shadow-lg p-4 border-0 rounded-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div
                className="avatar rounded-circle overflow-hidden bg-light d-flex justify-content-center align-items-center"
                style={{
                  width: '80px',
                  height: '80px',
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                {user.avatarPath ? (
                  <img
                    src={`http://localhost:8000/avatars/${user.avatarPath}`}
                    alt={user.username}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span className="text-primary">{user.username[0].toUpperCase()}</span>
                )}
              </div>
              <div className="ms-4">
                <h2 className="text-dark">{user.username}</h2>
                <p className="text-muted">{user.email}</p>
                <p className="text-secondary">Role: {user.role ? user.role.toUpperCase() : 'Not Set'}</p>
              </div>
            </div>

            <div className="mt-3">
              <h5 className="text-dark">Rating: </h5>
              <div className="d-flex align-items-center">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${user.averageRating > index ? 'filled' : ''}`}
                      style={{ fontSize: '24px', color: user.averageRating > index ? '#f39c12' : '#bdc3c7' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="ms-3">{user.averageRating} ({user.ratingCount} ratings)</p>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-dark">Welcome back, {user.username}!</h5>
              <p className="text-muted">
                We're glad to have you. Start exploring projects or connect with
                talented freelancers today.
              </p>
              <button className="btn btn-primary">Go to Dashboard</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center p-5 rounded-3">
          <h2 className="display-4">Welcome to FreelanceHub!</h2>
          <p className="lead">
            Connect with top professionals or find the perfect project in our
            secure ecosystem.
          </p>
          <button className="btn btn-outline-primary btn-lg">Get Started</button>
        </div>
      )}
      <UserRatings userId={user.id} />
    </div>
  );
}
