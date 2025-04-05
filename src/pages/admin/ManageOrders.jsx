import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/dataSlice';

export default function ManageOrders() {
  const orders = useSelector((state) => state.data.orders);
  const dispatch = useDispatch();

  return (
    <div className='page'>
      {orders.map((order) => (
        <div key={order.id} className='order'>
          <h2>Order ID: {order.id}</h2>
          <p>Status: {order.freelancerId ? "pending" : "free"}</p>
          <button onClick={() => dispatch(deleteOrder(order.id))}>Delete Order</button>
        </div>
      ))}
    </div>
  );
}
