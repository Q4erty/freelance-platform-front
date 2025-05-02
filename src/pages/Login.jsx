import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { setOrders } from '../redux/dataSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { setCategories } from '../redux/categorySlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/categories');
        const data = await res.json();
        dispatch(setCategories(data));
      } catch (err) {
        console.error('Failed to load categories');
      }
    };
    loadCategories();
  }, [dispatch]);

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

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        dispatch(login(user));
        navigate('/dashboard');
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (err) {
      toast.error('Connection error');
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
