import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateOrder } from '../../redux/dataSlice';

export default function EditOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.data.orders.find((order) => order.id === id));
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.categories.categories);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    deadline: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        title: order.title,
        description: order.description,
        price: order.price,
        category: order.category,
        deadline: order.deadline
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        dispatch(updateOrder(updatedOrder));
        if (user.role === 'client') {
          navigate('/client/my-orders');
        } else {
          navigate('/admin/manage-orders');
        }
        
      }
    } catch (err) {
      console.log('EditOrder.jsx errored updating order');
    }
  };

  return (
    <div className='container my-4 d-flex justify-content-center'>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className='text-center mb-4' style={{ fontWeight: 'bold' }}>
          Edit Order
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Project Title</label>
            <input
              type='text'
              name='title'
              className='form-control form-control-lg'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea
              name='description'
              className='form-control form-control-lg'
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Price (KZT)</label>
            <input
              type='number'
              name='price'
              className='form-control form-control-lg'
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Category</label>
            <select
              name='categoryId'
              className='form-control form-control-lg'
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='form-label'>Deadline</label>
            <input
              type='date'
              name='deadline'
              className='form-control form-control-lg'
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='btn btn-primary w-100 btn-lg'>
            Update Order
          </button>
        </form>
      </div>
    </div>
  );
}
