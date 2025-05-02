import UserRatings from '../components/UserRatings';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container py-5">
      {user ? (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="row g-0">
            {/* Аватар и основная информация */}
            <div className="col-md-4 bg-light p-4 d-flex flex-column align-items-center">
              <div className="avatar mb-3" style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
              }}>
                {user.avatarPath ? (
                  <img
                    src={`http://localhost:8000/avatars/${user.avatarPath}`}
                    alt={user.username}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-primary" 
                    style={{ fontSize: '48px', fontWeight: 'bold' }}>
                    {user.username[0].toUpperCase()}
                  </div>
                )}
              </div>
              
              <h2 className="h3 text-center">{user.username}</h2>
              <p className="text-muted text-center">{user.email}</p>
              
              <div className="mt-2 mb-4">
                <span className={`badge ${
                  user.role === 'ROLE_ADMIN' ? 'bg-danger' :
                  user.role === 'ROLE_FREELANCER' ? 'bg-success' : 'bg-primary'
                } rounded-pill px-3 py-2`}>
                  {user.role ? user.role.replace('ROLE_', '') : 'GUEST'}
                </span>
              </div>
            </div>

            {/* Детали профиля */}
            <div className="col-md-8 p-4">
              <div className="mb-4">
                <h3 className="mb-3">Profile Overview</h3>
                
                {/* Рейтинг */}
                <div className="mb-4">
                  <h5 className="mb-2">Your Rating</h5>
                  <div className="d-flex align-items-center">
                    <div className="stars me-2">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${user.averageRating > index ? 'text-warning' : 'text-muted'}`}
                          style={{ fontSize: '24px' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-muted">
                      {user.averageRating?.toFixed(1) || '0.0'} ({user.ratingCount || 0} ratings)
                    </span>
                  </div>
                </div>

                {/* Приветственное сообщение */}
                <div className="welcome-message bg-light p-3 rounded-3">
                  <h5 className="text-primary">Welcome back, {user.username}!</h5>
                  <p className="mb-0">
                    {user.role === 'ROLE_FREELANCER' 
                      ? 'Check your latest project offers or update your portfolio.'
                      : user.role === 'ROLE_CLIENT'
                      ? 'Find the perfect freelancer for your next project.'
                      : 'Manage the platform and help our community grow.'}
                  </p>
                </div>

                {/* Действия */}
                <div className="mt-4 d-flex gap-3">
                  <Link to="/dashboard" className="btn btn-primary px-4">
                    Go to Dashboard
                  </Link>
                </div>
              </div>
              {user && <UserRatings userId={user.id} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="hero-section text-center p-5 rounded-4 bg-light shadow-sm">
          <h1 className="display-5 fw-bold mb-4">Welcome to FreelanceHub</h1>
          <p className="lead mb-4">
            Connect with top professionals or find the perfect project in our secure ecosystem.
            Join thousands of satisfied users today.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-outline-primary btn-lg px-4">
              Learn More
            </Link>
          </div>
        </div>
      )}
      
    </div>
  );
}