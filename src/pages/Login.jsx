import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { setOrders } from '../redux/dataSlice'

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
  }

  const loadAllOrders = async () => {
    const response = await fetch('http://localhost:3001/orders');
    const data = await response.json();
    if (data.length > 0) {
      dispatch(setOrders(data));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    if (userData.ok) {
      const users = await userData.json();
      const user = users[0];

      if (user) {
        if (user.role === 'admin' || user.role === 'freelancer') loadAllOrders();
        else if (user.role === 'client') loadOrders(user.id);

        dispatch(login(user));
        loadOrders(user.id);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='page'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
