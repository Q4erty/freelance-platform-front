import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateOrder } from '../../redux/dataSlice';

export default function EditOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    deadline: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch(`http://localhost:8000/api/orders/${id}`, {
          credentials: 'include'
        });
        if (!orderResponse.ok) throw new Error('Order not found');
        const orderData = await orderResponse.json();
        console.log(orderData)

        const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
          credentials: 'include'
        });
        const categoriesData = await categoriesResponse.json();

        setCategories(categoriesData);
        setFormData({
          title: orderData.title,
          description: orderData.description,
          price: orderData.price,
          categoryId: orderData.categoryId,
          deadline: orderData.deadline.split('T')[0]
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!user || (user.role !== 'ROLE_CLIENT' && user.role !== 'ROLE_ADMIN')) {
      toast.error('Access denied');
      return navigate('/');
    }

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Update failed');

      dispatch(updateOrder(data));
      toast.success('Order updated successfully!');
      
      navigate('/client/my-orders');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="text-center my-4">Loading order data...</div>;

  return (
    <div className='container my-4 d-flex justify-content-center'>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className='text-center mb-4'>Edit Order</h2>
        
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Project Title</label>
            <input
              type='text'
              name='title'
              className='form-control'
              value={formData.title}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={100}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea
              name='description'
              className='form-control'
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={1000}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Price (KZT)</label>
            <input
              type='number'
              name='price'
              className='form-control'
              value={formData.price}
              onChange={handleChange}
              required
              min={1000}
              step={500}
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Category</label>
            <select
              name='categoryId'
              className='form-control'
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
              className='form-control'
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <button 
            type='submit' 
            className='btn btn-primary w-100'
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Order'}
          </button>
        </form>
      </div>
    </div>
  );
}