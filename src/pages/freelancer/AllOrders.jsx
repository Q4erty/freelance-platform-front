import { useSelector, useDispatch } from 'react-redux';
import { setOrders } from '../../redux/dataSlice';

export default function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const user = useSelector((state) => state.auth.user);

  const handleGetOrder = async (orderId) => {
    

    const reponse = await fetch(`http://localhost:3001/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ freelancerId: user.id })
    });
    if (reponse.ok) {
      const updatedOrder = await reponse.json();
      console.log(updatedOrder);
      dispatch(setOrders([updatedOrder]));
      alert('Order claimed successfully!');
    } else {
      alert('Failed to claim order');
    }
  };

  return (
    <div className='page'>
      <h2>All Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders
            .filter((order) => order.freelancerId === null)
            .map((order) => (
              <li key={order.id}>
                <strong>{order.title}</strong>: {order.description}
                <button onClick={() => handleGetOrder(order.id)}>Get</button>
              </li>
            ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
