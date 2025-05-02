// src/pages/admin/ManageOrders.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';
import { Link } from 'react-router-dom';

export default function ManageOrders() {
  const orders = useSelector((state) => state.data.orders);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersRes = await fetch('http://localhost:8000/api/orders');
        const ordersData = await ordersRes.json();
        dispatch(setOrders(ordersData));

        const categoriesRes = await fetch('http://localhost:8000/api/categories');
        const categoriesData = await categoriesRes.json();
        dispatch(setCategories(categoriesData));
      } catch (err) {
        console.error('Loading error:', err);
      }
    };
    loadData();
  }, [dispatch]);

  return (
    <div className='container my-4'>
      <h2 className='mb-4'>Orders Overview</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {orders.map((order) => (
          <div key={order.id} className='col'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title'>{order.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>
                  Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}
                </h6>
                <span className={`badge ${order.status === 'COMPLETED' ? 'bg-success' : 'bg-warning'}`}>
                  {order.status}
                </span>
                <p className='small mt-2'>{order.description}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className='fw-bold text-success'>{order.price} KZT</span>
                <small className='text-muted'>Deadline: {new Date(order.deadline).toLocaleDateString()}</small>
              </div>
              <div className='card-footer'>
                <div className='d-grid'>
                  <Link 
                    to={`/orders/${order.id}`} 
                    className='btn btn-outline-info btn-sm'
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}