import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '../../redux/dataSlice';
import { useEffect } from 'react';
import { setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';

export default function MyApplications() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.data.orders);
  const applications = orders.filter((order) => order.freelancerId === user.id);

  useEffect(() => {
      const loadData = async () => {
        try {
          const ordersRes = await fetch('http://localhost:3001/orders');
          const ordersData = await ordersRes.json();
          dispatch(setOrders(ordersData));
  
          const categoriesRes = await fetch('http://localhost:3001/categories');
          const categoriesData = await categoriesRes.json();
          dispatch(setCategories(categoriesData));
        } catch (err) {
          console.error('Loading error:', err);
        }
      };
      loadData();
    }, [dispatch]);

  const handleCancel = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: null })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        dispatch(updateOrder(updatedOrder));
      }
    } catch (err) {
      console.log('MyApplications.jsx errored canceling application');
    }
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>My Applications</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {applications.map((order) => (
          <div key={order.id} className='col'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title text-primary'>{order.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Category: {order.category}</h6>
                <p className='card-text mt-2'>{order.description}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className='fw-bold text-success'>{order.price} KZT</span>
                <small className='text-muted'>Deadline: {order.deadline}</small>
              </div>
              <div className='card-body'>
                <button onClick={() => handleCancel(order.id)} className='btn btn-outline-danger w-100'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
