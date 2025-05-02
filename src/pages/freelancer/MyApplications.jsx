import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/applications/freelancer/${user.id}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to load applications');
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchApplications();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this application?')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/applications/${id}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to cancel application');
      toast.success('Application cancelled');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    if (!window.confirm('Вы уверены что хотите завершить заказ?')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}/complete`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Ошибка завершения заказа');
      setApplications(prev =>
        prev.map(app =>
          app.order?.id === orderId
            ? { ...app, order: { ...app.order, freelancerConfirmed: true } }
            : app
        )
      );
      toast.success('Заказ отправлен на подтверждение клиенту');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = applications.filter(app =>
    selectedStatus === 'ALL' || app.status === selectedStatus
  );

  if (loading) return <div className="text-center my-4">Loading applications...</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Applications</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="DECLINED">Declined</option>
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-lg-2 g-4">
        {filtered.map(app => (
          <div key={app.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    {app.order ? (
                      <h5>
                        <Link
                          to={`/orders/${app.order.id}`}
                          className="text-decoration-none"
                        >
                          {app.order.title}
                        </Link>
                      </h5>
                    ) : (
                      <h5 className="text-danger">Order not found</h5>
                    )}

                    <p className="text-muted small mb-2">{app.proposal}</p>
                    <div className="d-flex gap-2">
                      <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-muted">
                        Applied: {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="btn-group">
                    {app.status === 'PENDING' && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleCancel(app.id)}
                      >
                        Cancel
                      </button>
                    )}
                    {app.status === 'ACCEPTED' && app.order?.status === 'IN_PROGRESS' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCompleteOrder(app.order.id)}
                      >
                        Завершить заказ
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {app.order && (
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <span className="text-success fw-bold">
                      {app.order.price ? `${app.order.price} KZT` : 'Price not set'}
                    </span>
                    <span className="text-muted">
                      Deadline: {
                        app.order.deadline && !isNaN(new Date(app.order.deadline))
                          ? new Date(app.order.deadline).toLocaleDateString()
                          : 'Not specified'
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="alert alert-info mt-4">
          {applications.length === 0
            ? "You haven't applied to any orders yet"
            : "No applications match selected status"}
        </div>
      )}
    </div>
  );
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ACCEPTED':
      return 'bg-success';
    case 'DECLINED':
      return 'bg-danger';
    default:
      return 'bg-warning text-dark';
  }
};
