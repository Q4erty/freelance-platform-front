import { useSelector } from 'react-redux';
import { selectOrdersByCreator } from '../../redux/dataSlice';

export default function MyOrders() {
  const user = useSelector(state => state.auth.user);
  const creatorId = user.id;
  const creatorOrders = useSelector(state => selectOrdersByCreator(state, creatorId));

  return (
    <div>
      <h2>Заказы созданные пользователем {creatorId}</h2>
      <ul>
        {creatorOrders.length > 0 ? (
          creatorOrders.map(order => (
            <li key={order.id}>{order.description}</li>
          ))
        ) : (
          <p>Нет заказов для этого пользователя.</p>
        )}
      </ul>
    </div>
  );
}
