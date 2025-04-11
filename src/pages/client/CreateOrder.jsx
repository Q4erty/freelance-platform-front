import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setOrders } from '../../redux/dataSlice';
import { useNavigate } from 'react-router-dom';


export default function CreateOrder() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.data.orders);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      title,
      description,
      price,
      category,
      deadline,
      clientId: user.id,
      freelancerId: null
    };

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
      .then((res) => res.json())
      .then((order) => {
        dispatch(setOrders([...orders, order]));
        navigate('/client/my-orders');
      });
  };

  return (
    <div className='container my-4 d-flex justify-content-center'>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <h2 className='text-center mb-4' style={{ fontWeight: 'bold' }}>
          Create New Order
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Project Title</label>
            <input
              type='text'
              className='form-control form-control-lg'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea
              className='form-control form-control-lg'
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Price (KZT)</label>
            <input
              type='number'
              className='form-control form-control-lg'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Category</label>
            <input
              type='text'
              className='form-control form-control-lg'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='form-label'>Deadline</label>
            <input
              type='date'
              className='form-control form-control-lg'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-primary w-100 btn-lg'>
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
}
