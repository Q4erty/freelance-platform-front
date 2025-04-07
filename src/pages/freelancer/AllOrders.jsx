import { useSelector, useDispatch } from 'react-redux';
import { setOrders } from '../../redux/dataSlice';

export default function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const user = useSelector((state) => state.auth.user);

  const handleGetOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ freelancerId: user.id }),
      });

      if (!response.ok) throw new Error();

      const updatedOrder = await response.json();
      const updatedOrders = orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      dispatch(setOrders(updatedOrders));
      alert('Order claimed successfully!');
    } catch (err) {
      alert('Failed to claim order');
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
                  <h6 className='card-subtitle mb-2 text-muted'>Category: {order.category}</h6>
                  <p className='card-text flex-grow-1'>{order.description}</p>
                  <div className='d-flex justify-content-between align-items-center mt-auto'>
                    <span className='fw-bold text-success'>{order.price} KZT</span>
                    <span className='text-muted'>Deadline: {new Date(order.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className='card-body'>
                  <button
                    className='btn btn-success w-100 mt-3'
                    onClick={() => handleGetOrder(order.id)}
                  >
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
