import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RatingModal from '../../components/RatingModal';

export default function FreelancerMyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [canRate, setCanRate] = useState({});
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const checkRatings = async () => {
        const checks = await Promise.all(
            orders.map(async order => {
                if (order.status === 'COMPLETED') {
                    const res = await fetch(
                        `http://localhost:8000/api/ratings/check/${order.id}`,
                        { credentials: 'include' }
                    );
                    return { id: order.id, canRate: await res.json() };
                }
                return { id: order.id, canRate: false };
            })
        );
        setCanRate(checks.reduce((acc, curr) => 
            ({ ...acc, [curr.id]: curr.canRate }), {}));
    };
    checkRatings();
  }, [orders]);
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders?freelancerId=${user.id}`, {
          credentials: 'include'
        });
        const data = await response.json();
        console.log('Orders data:', data);
        // Убираем фильтр по статусу
        setOrders(data.content.filter(order => order.freelancerId === user.id));
      } catch (err) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) loadOrders();
  }, [user]);

  // Фильтруем заказы по статусу
  const filteredOrders = orders.filter(order => 
    showCompleted 
      ? order.status === 'COMPLETED' 
      : order.status === 'IN_PROGRESS'
  );

  const handleComplete = async (orderId) => {
    if (!window.confirm('Вы уверены что хотите завершить заказ?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/complete`, {
        method: 'PATCH',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Ошибка завершения заказа');
      
      setOrders(orders.map(order => 
        order.id === orderId ? { 
          ...order, 
          freelancerConfirmed: true,
          status: 'COMPLETED' // Обновляем статус локально
        } : order
      ));
      toast.success('Заказ отправлен на подтверждение клиенту');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-center my-4">Loading orders...</div>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Мои заказы</h2>
        <div className="btn-group">
          <button 
            className={`btn ${!showCompleted ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setShowCompleted(false)}
          >
            Активные
          </button>
          <button 
            className={`btn ${showCompleted ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setShowCompleted(true)}
          >
            Завершённые
          </button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="col">
            <div className={`card h-100 shadow-sm ${order.status === 'COMPLETED' ? 'border-success' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{order.title}</h5>
                <p className="card-text text-muted small">{order.description}</p>
                
                <div className="mt-2">
                  <span className={`badge bg-${order.status === 'COMPLETED' ? 'success' : 'primary'}`}>
                    {order.status === 'COMPLETED' ? 'Завершён' : 'Активен'}
                  </span>
                  <span className="ms-2 text-muted">
                    {new Date(order.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-success">
                    {order.price} KZT
                  </span>
                  {order.status === 'IN_PROGRESS' ? (
                    <button 
                      className={`btn btn-${order.freelancerConfirmed ? 'success' : 'primary'}`}
                      onClick={() => handleComplete(order.id)}
                      disabled={order.freelancerConfirmed}
                    >
                      {order.freelancerConfirmed ? 'Ожидает подтверждения' : 'Завершить заказ'}
                    </button>
                  ) : (
                    <div>
                      {order.status === 'COMPLETED' && canRate[order.id] && (
                          <button 
                              className="btn btn-info btn-sm"
                              onClick={() => setSelectedOrder(order.id)}
                          >
                              Rate Order
                          </button>
                      )}

                      {selectedOrder && (
                          <RatingModal
                              orderId={selectedOrder}
                              onClose={() => setSelectedOrder(null)}
                              onRate={() => setCanRate(prev => ({
                                  ...prev, 
                                  [selectedOrder]: false
                              }))}
                          />
                      )}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="alert alert-info mt-4">
          {showCompleted 
            ? "Нет завершённых заказов" 
            : "Нет активных заказов"}
        </div>
      )}
    </div>
  );
}