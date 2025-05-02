import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittedApplications, setSubmittedApplications] = useState([]); // New state
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orders', { credentials: 'include' });
        const data = await res.json();
        const availableOrders = data.content.filter(order => order.freelancerId === null);
        setOrders(availableOrders);
      } catch (err) {
        toast.error('Failed to load orders');
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories', { credentials: 'include' });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        toast.error('Failed to load categories');
      }
    };

    const loadData = async () => {
      await fetchOrders();
      await fetchCategories();
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchSubmittedApplications = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/applications/freelancer/${user.id}`, { credentials: 'include' });
        const data = await res.json();
        setSubmittedApplications(data.map(application => application.orderId));
      } catch (err) {
        toast.error('Failed to load submitted applications');
      }
    };

    if (user?.id) {
      fetchSubmittedApplications();
    }
  }, [user]);

  const handleApply = async (orderId) => {
    if (!window.confirm('Submit application for this order?')) return;

    try {
      const res = await fetch('http://localhost:8000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          orderId,
          proposal: `Application from ${user.username}`
        })
      });

      if (!res.ok) throw new Error('Application failed');

      toast.success('Application submitted!');
      setOrders(prev => prev.filter(order => order.id !== orderId));
      setSubmittedApplications(prev => [...prev, orderId]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? order.categoryId.toString() === selectedCategory : true;
    const isAlreadyApplied = submittedApplications.includes(order.id);

    return matchesSearch && matchesCategory && !isAlreadyApplied;
  });

  if (loading) return <div className="text-center my-4">Loading orders...</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Available Orders</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
              </div>

              <div className="card-footer d-grid">
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleApply(order.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="alert alert-info mt-4">
          No available orders found
        </div>
      )}
    </div>
  );
}
