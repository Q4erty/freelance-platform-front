import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import '../App.css';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>
        FreelanceHub
      </Link>
      <div className='nav-links'>
        {!user && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to='/dashboard'>Dashboard</Link>

            {user.role === 'admin' && <Link to='/admin/manage-orders'>Manage Orders</Link>}

            {user.role === 'client' && (
              <>
                <Link to='/client/my-orders'>My Orders</Link>
                <Link to='/client/create-order'>Create Order</Link>
              </>
            )}

            {user.role === 'freelancer' && (
              <>
                <Link to='/freelancer/all-orders'>All Orders</Link>
                <Link to='/freelancer/my-applications'>My Applications</Link>
              </>
            )}

            <button onClick={handleLogout} className='logout-button'>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
