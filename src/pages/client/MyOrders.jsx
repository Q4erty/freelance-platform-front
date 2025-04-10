import { useSelector } from 'react-redux';
import { selectOrdersByCreator } from '../../redux/dataSlice';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/dataSlice';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const creatorId = user.id;
  const creatorOrders = useSelector((state) => selectOrdersByCreator(state, creatorId));

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteOrder(orderId));
        alert('Order deleted successfully');
      }
    } catch (error) {
      alert('Error deleting order');
    }
  };

  return (
    <div className='container my-4'>
      <h2 className='mb-4'>My Orders</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {creatorOrders.map((order) => (
          <div key={order.id} className='col'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title'>{order.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Category: {order.category}</h6>
                <span className={`badge ${order.freelancerId ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {order.freelancerId ? 'In Progress' : 'Waiting Freelancer'}
                </span>
                <p className='card-text mt-2'>{order.description}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className='fw-bold'>{order.price} KZT</span>
                <small className='text-muted'>Deadline: {order.deadline}</small>
              </div>
              {!order.freelancerId && (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
