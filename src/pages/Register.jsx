import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerUser = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role, password})
    });

    if (registerUser.ok) {
      alert('Registration successful, please login');
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className='page d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className='card' style={{ maxWidth: '400px', width: '100%' }}>
        <div className='card-body'>
          <h2 className='text-center mb-4'>Register</h2>
          <form onSubmit={handleRegister}>
            <div className='mb-3'>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='form-control'
              />
            </div>
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
              <select value={role} onChange={(e) => setRole(e.target.value)} className='form-control'>
                <option value='client'>Client</option>
                <option value='freelancer'>Freelancer</option>
              </select>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
