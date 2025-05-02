import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RatingModal from '../../components/RatingModal';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [canRate, setCanRate] = useState({});

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:8000/api/orders', { credentials: 'include' }),
          fetch('http://localhost:8000/api/categories', { credentials: 'include' })
        ]);

        if (!ordersRes.ok) throw new Error('Failed to load orders');
        if (!categoriesRes.ok) throw new Error('Failed to load categories');

        const [ordersData, categoriesData] = await Promise.all([
          ordersRes.json(),
          categoriesRes.json()
        ]);

        const userOrders = ordersData.content.filter(o => o.clientId === user.id);
        setOrders(userOrders);
        setCategories(categoriesData);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  useEffect(() => {
    const checkRatings = async () => {
      const checks = await Promise.all(
        orders.map(async (order) => {
          if (order.status === 'COMPLETED') {
            const res = await fetch(`http://localhost:8000/api/ratings/check/${order.id}`, { credentials: 'include' });
            const canRate = await res.json();
            return { id: order.id, canRate };
          }
          return { id: order.id, canRate: false };
        })
      );

      setCanRate(checks.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.canRate }), {}));
    };

    checkRatings();
  }, [orders]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(prev => prev.filter(o => o.id !== id));
      toast.success('Order deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleConfirmCompletion = async (id) => {
    if (!window.confirm('Подтвердить завершение заказа?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}/complete`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Ошибка подтверждения');
      setOrders(prev => prev.map(o => o.id === id ? { ...o, clientConfirmed: true, status: 'COMPLETED' } : o));
      toast.success('Заказ успешно завершен');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredOrders = selectedCategory 
    ? orders.filter(o => o.categoryId === parseInt(selectedCategory))
    : orders;

  if (loading) return <div className="text-center my-5 py-5">Loading orders...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Orders</h2>
      </div>

      <div className="mb-4">
        <select 
          className="form-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          {selectedCategory 
            ? 'No orders found in this category'
            : 'No orders found. Create your first order!'}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{order.title}</h5>
                    <span className={`badge ${getStatusBadgeClass(order)}`}>{order.status}</span>
                  </div>

                  <h6 className="card-subtitle text-muted mb-3">
                    {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
                  </h6>

                  <p className="card-text small text-muted">{order.description}</p>

                  {order.freelancer && (
                    <div className="mt-2">
                      <span className="badge bg-info">Assigned to: {order.freelancer.username}</span>
                    </div>
                  )}
                </div>

                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary">{new Date(order.deadline).toLocaleDateString()}</span>
                    <span className="fw-bold text-success">{order.price} KZT</span>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    {!order.freelancerId ? (
                      <>
                        <Link to={`/orders/${order.id}/applications`} className="btn btn-outline-info btn-sm">Applications</Link>
                        <Link to={`/client/edit-order/${order.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>
                        <button onClick={() => handleDelete(order.id)} className="btn btn-outline-danger btn-sm">Delete</button>
                      </>
                    ) : (
                      order.freelancerConfirmed && (
                        <>
                          {!order.clientConfirmed && (
                            <button onClick={() => handleConfirmCompletion(order.id)} className="btn btn-success btn-sm">
                              Confirm completion
                            </button>
                          )}
                          {order.status === 'COMPLETED' && canRate[order.id] && (
                            <button className="btn btn-info btn-sm" onClick={() => setSelectedOrder(order.id)}>
                              Rate Order
                            </button>
                          )}
                          {selectedOrder && (
                            <RatingModal
                              orderId={selectedOrder}
                              onClose={() => setSelectedOrder(null)}
                              onRate={() => setCanRate(prev => ({ ...prev, [selectedOrder]: false }))}
                            />
                          )}
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const getStatusBadgeClass = (order) => {
  switch (order.status) {
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