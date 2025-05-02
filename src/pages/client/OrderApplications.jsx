
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OrderApplications() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/applications/order/${orderId}`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to load applications');

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchApplications();
  }, [orderId]);

  const handleApplicationAction = async (action, applicationId) => {
    if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this application?`)) return;

    try {
      setIsProcessing(true);
      const response = await fetch(
        `http://localhost:8000/api/applications/${applicationId}/${action.toLowerCase()}`,
        {
          method: 'PATCH',
          credentials: 'include'
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} application`);

      navigate('/client/my-orders')

      if (action === 'ACCEPT') {
        setApplications(applications.filter(app => app.id !== applicationId));
        toast.success('Application accepted');
      } else {
        setApplications(applications.map(app =>
          app.id === applicationId ? { ...app, status: 'DECLINED' } : app
        ));
        toast.success('Application declined');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-0">Applications for Order #{orderId}</h3>

      {applications.length === 0 ? (
        <div className="card shadow-sm my-4">
          <div className="card-body text-center py-5">
            <h5 className="text-muted">No applications yet</h5>
            <p className="text-muted">Check back later</p>
          </div>
        </div>
      ) : (
        <div className="row g-4 my-3">
          {applications.map(application => (
            <div key={application.id} className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="mb-1">
                    <Link to={`/users/${application.freelancer.id}`} className="text-decoration-none">
                      {application.freelancer.username}
                    </Link>
                  </h5>
                  <p className="text-muted mb-2">
                    Rating {application.freelancer.averageRating || 'N/A'} ({application.freelancer.ratingCount || 0} reviews)
                  </p>

                  <h6 className="text-primary mb-1">Proposal</h6>
                  <p className="mb-2">{application.proposal}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Applied {new Date(application.createdAt).toLocaleDateString()}
                    </small>
                    {application.status === 'ACCEPTED' && (
                      <span className="badge bg-success">Accepted</span>
                    )}
                    {application.status === 'DECLINED' && (
                      <span className="badge bg-danger">Declined</span>
                    )}
                  </div>
                </div>

                {application.status === 'PENDING' && (
                  <div className="card-footer bg-transparent border-0 pt-0">
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-success"
                        onClick={() => handleApplicationAction('ACCEPT', application.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Accept'}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleApplicationAction('DECLINE', application.id)}
                        disabled={isProcessing}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: '40px', marginTop: '30px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back
        </button>
      </div>
    </div>
  );
}