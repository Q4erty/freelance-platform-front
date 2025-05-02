import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RatingModal from '../../components/RatingModal';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [canRate, setCanRate] = useState({});

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
    const loadData = async () => {
      try {
        const ordersResponse = await fetch(`http://localhost:8000/api/orders`, {
          credentials: 'include'
        });
        
        if (!ordersResponse.ok) throw new Error('Failed to load orders');
        const ordersData = await ordersResponse.json();
        const userOrders = ordersData.content.filter(order => order.clientId === user.id);
        console.log(userOrders);

        const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
          credentials: 'include'
        });
        const categoriesData = await categoriesResponse.json();

        setOrders(userOrders);
        setCategories(categoriesData);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleConfirmCompletion = async (orderId) => {
    if (!window.confirm('Подтвердить завершение заказа?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/complete`, {
        method: 'PATCH',
        credentials: 'include'
      });
  
      if (!response.ok) throw new Error('Ошибка подтверждения');
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, clientConfirmed: true, status: 'COMPLETED' } : order
      ));
      toast.success('Заказ успешно завершен');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredOrders = orders.filter(order => 
    selectedCategory ? order.categoryId === Number(selectedCategory) : true
  );

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete order');
      
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success('Order deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    if (!window.confirm('Mark this order as completed?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/complete`, {
        method: 'PUT',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to complete order');
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'COMPLETED' } : order
      ));
      toast.success('Order marked as completed');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="text-center my-4">Loading orders...</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Orders</h2>
      
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{order.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
                </h6>
                <p className="card-text text-muted small">{order.description}</p>
                
                {order.freelancer && (
                  <div className="mt-2">
                    <span className="badge bg-info">
                      Assigned to: {order.freelancer.username}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">
                    {new Date(order.deadline).toLocaleDateString()}
                  </span>
                  <span className="fw-bold text-success">
                    {order.price} KZT
                  </span>
                </div>
                <div className="mt-2">
                  <span className={`badge ${getStatusBadgeClass(order)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="card-footer d-grid gap-2">
                {!order.freelancerId ? (
                  <>
                    <Link 
                      to={`/orders/${order.id}/applications`}
                      className="btn btn-outline-info btn-sm"
                    >
                      Applications
                    </Link>
                    <Link
                      to={`/client/edit-order/${order.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  order.freelancerConfirmed && (
                    <>
                      {order.freelancerConfirmed && !order.clientConfirmed && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleConfirmCompletion(order.id)}
                        >
                          Подтвердить завершение
                        </button>
                      )}
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
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="alert alert-info mt-4">
          No orders found. Create your first order!
        </div>
      )}
    </div>
  );
}

const getStatusBadgeClass = (order) => {
  switch(order.status) {
    case 'COMPLETED': return 'bg-success';
    case 'IN_PROGRESS':
      return order.clientConfirmed 
        ? 'bg-success' 
        : order.freelancerConfirmed 
          ? 'bg-info' 
          : 'bg-warning text-dark';
    case 'CANCELLED': return 'bg-danger';
    default: return 'bg-secondary';
  }
};
