import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('ROLE_CLIENT');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);
  
    try {
      console.log('Form data:', formData);
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
  
      if (response.ok) {
        const user = await response.json();
        dispatch(login(user));
        navigate('/dashboard');
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
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
                <option value='ROLE_CLIENT'>Client</option>
                <option value='ROLE_FREELANCER'>Freelancer</option>
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
            <div className='mb-3'>
              <input
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
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