import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';

export default function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.categories.categories);

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

  const handleGetOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: user.id })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        const updatedOrders = orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order));
        dispatch(setOrders(updatedOrders));
      } else {
        console.log('AllOrders.jsx failed to claim order');
      }
    } catch (err) {
      alert('AllOrders.jsx failed to claim order');
    }
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>All Orders</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {orders
          .filter((order) => order.freelancerId === null)
          .map((order) => (
            <div key={order.id} className='col'>
              <div className='card h-100 shadow-sm'>
                <div className='card-body d-flex flex-column'>
                  <h5 className='card-title text-primary'>{order.title}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}</h6>
                  <p className='card-text flex-grow-1'>{order.description}</p>
                </div>
                <div className='card-footer'>
                  <div className='d-flex justify-content-between align-items-center mt-auto'>
                    <span className='fw-bold text-success'>{order.price} KZT</span>
                    <span className='text-muted'>Deadline: {order.deadline}</span>
                  </div>
                  <button className='btn btn-outline-success w-100 mt-4' onClick={() => handleGetOrder(order.id)}>
                    Get Order
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
