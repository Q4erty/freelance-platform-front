import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          FreelanceHub
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            {!user && (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className='nav-item'>
                  <Link to='/dashboard' className='nav-link'>
                    Dashboard
                  </Link>
                </li>

                {user.role === 'admin' && (
                  <>
                    <li className='nav-item'>
                      <Link to='/admin/manage-orders' className='nav-link'>
                        Manage Orders
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/admin/manage-orders' className='nav-link'>
                        Manage Orders
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/admin/manage-categories' className='nav-link'>
                        Manage Categories
                      </Link>
                    </li>
                  </>
                )}

                {user.role === 'client' && (
                  <>
                    <li className='nav-item'>
                      <Link to='/client/my-orders' className='nav-link'>
                        My Orders
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/client/create-order' className='nav-link'>
                        Create Order
                      </Link>
                    </li>
                  </>
                )}

                {user.role === 'freelancer' && (
                  <>
                    <li className='nav-item'>
                      <Link to='/freelancer/all-orders' className='nav-link'>
                        All Orders
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link to='/freelancer/my-applications' className='nav-link'>
                        My Applications
                      </Link>
                    </li>
                  </>
                )}

                <li className='nav-item'>
                  <button onClick={handleLogout} className='btn btn-outline-light'>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
