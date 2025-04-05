import { useSelector } from "react-redux";

export default function AllOrders() {
  const orders = useSelector((state) => state.data.orders);

  return (
    <div className='page'>
      <h2>All Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>{order.title}</strong>: {order.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
