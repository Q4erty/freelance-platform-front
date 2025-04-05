import { useSelector, useDispatch } from 'react-redux';

export default function ManageOrders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  return (
    <div className='page'>
      <h2>Manage Orders</h2>
      <p>Admin can see, edit, or delete all orders here.</p>
    </div>
  );
}
