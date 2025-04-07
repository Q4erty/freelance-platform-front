import { useSelector } from 'react-redux';
import { selectOrdersByCreator } from '../../redux/dataSlice';

export default function MyOrders() {
  const user = useSelector((state) => state.auth.user);
  const creatorId = user.id;
  const creatorOrders = useSelector((state) => selectOrdersByCreator(state, creatorId));

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
                <small className='text-muted'>Deadline: {new Date(order.deadline).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
