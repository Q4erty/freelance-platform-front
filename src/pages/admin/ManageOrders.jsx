import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/dataSlice';

export default function ManageOrders() {
  const orders = useSelector((state) => state.data.orders);
  const dispatch = useDispatch();

  return (
    <div className="container my-4">
      <h2>Manage Orders</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{order.title}</h5>
              <div className="mb-2 text-muted">{order.category}</div>
              <span className={`badge ${order.freelancerId ? 'bg-warning text-dark' : 'bg-success'}`}>
                {order.freelancerId ? 'Pending' : 'Available'}
              </span>
              <p className="small mt-2">{order.description}</p>
              <div className="fw-bold">{order.price} KZT</div>
              <div className="text-muted small mb-2">
                Deadline: {new Date(order.deadline).toLocaleDateString()}
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(deleteOrder(order.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}