import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to load order');
        const data = await response.json();

        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          categoryId: data.categoryId || '',
          deadline: data.deadline ? data.deadline.split('T')[0] : ''
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to load categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder().then(fetchCategories);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update order');

      toast.success('Order updated successfully!');
      navigate('/client/my-orders');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading order...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Edit Project</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minLength={20}
                maxLength={1000}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Budget (KZT)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min={1000}
                    step={500}
                  />
                  <span className="input-group-text">KZT</span>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
