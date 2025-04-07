import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to='/login' />;

  return (
    <div className='dashboard'>
      <h2>Your Success Platform</h2>
      <p>Join professionals and companies achieving their goals with FreelanceHub</p>

      <div className='features'>
        <div className='feature'>
          <span>💼</span>
          <h3>Find Perfect Match</h3>
          <p>Smart matching connects you with ideal clients or freelancers.</p>
        </div>
        <div className='feature'>
          <span>🔒</span>
          <h3>Secure Payments</h3>
          <p>Escrow system ensures safe transactions.</p>
        </div>
        <div className='feature'>
          <span>📈</span>
          <h3>Growth Tools</h3>
          <p>Analytics to help grow your business.</p>
        </div>
      </div>

      <div className='cta'>
        <h2>Ready to Get Started?</h2>
        <p>Join our community and take your projects to the next level.</p>
        {!user ? (
          <>
            <Link to='/register' className='cta-button'>Sign Up</Link>
            <Link to='/login' className='cta-button secondary'>Login</Link>
          </>
        ) : (
          <Link to='/' className='cta-button'>Go to Profile</Link>
        )}
      </div>
    </div>
  );
}
