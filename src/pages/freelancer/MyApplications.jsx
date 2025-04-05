import { useSelector } from "react-redux";

export default function MyApplications() {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.data.orders);
  const applications = orders.filter((order) => order.freelancerId === user.id);

  return (
    <div className='page'>
      {applications.length > 0 ? (
        <ul>
          {applications.map((order) => (
            <li key={order.id}>
              <strong>{order.title}</strong>: {order.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}
