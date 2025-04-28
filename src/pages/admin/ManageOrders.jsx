import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/dataSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';

export default function ManageOrders() {
  const orders = useSelector((state) => state.data.orders);
  const categories = useSelector((state) => state.categories.categories); 
  const dispatch = useDispatch();

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

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteOrder(orderId));
      }
    } catch (error) {
      console.log("ManageOrders.jsx deleteOrder error");
    }
  };

  return (
    <div className='container my-4'>
      <h2 className='mb-4'>Manage Orders</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {orders.map((order) => (
          <div key={order.id} className='col'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title'>{order.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}</h6>
                <span className={`badge ${order.freelancerId ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {order.freelancerId ? 'Pending' : 'Available'}
                </span>
                <p className='small mt-2'>{order.description}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className='fw-bold text-success'>{order.price} KZT</span>
                <small className='text-muted'>Deadline: {order.deadline}</small>
              </div>

              <div className='card-footer d-flex p-0'>
                <Link
                  to={`/client/edit-order/${order.id}`}
                  className='btn btn-outline-primary w-50 rounded-0 border-end'>
                  Edit
                </Link>
                <button onClick={() => handleDelete(order.id)} className='btn btn-outline-danger w-50 rounded-0'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
