import { use, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { setOrders } from '../redux/dataSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadOrders = async (id) => {
    const response = await fetch(`http://localhost:3001/orders?clientId=${id}`);
    const data = await response.json();
    if (data.length > 0) {
      dispatch(setOrders(data));
    }
  };

  const loadAllOrders = async () => {
    const response = await fetch('http://localhost:3001/orders');
    const data = await response.json();
    if (data.length > 0) {
      dispatch(setOrders(data));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    if (userData.ok) {
      const users = await userData.json();
      const user = users[0];

      if (user) {
        if (user.role === 'admin' || user.role === 'freelancer') {
          await loadAllOrders();
        } else if (user.role === 'client') {
          await loadOrders(user.id);
        }

        dispatch(login(user));
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='page d-flex justify-content-center align-items-center' style={{ minHeight: '80vh'}}>
      <div className='card' style={{ maxWidth: '400px', width: '100%' }}>
        <div className='card-body'>
          <h2 className='text-center mb-4'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
