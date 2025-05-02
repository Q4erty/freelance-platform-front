import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OrderApplications() {
    const { orderId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/applications/order/${orderId}`, {
                    credentials: 'include'
                });
                const data = await response.json();
                setApplications(data);
            } catch (err) {
                toast.error('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };
        loadApplications();
    }, [orderId]);

    const handleAccept = async (applicationId) => {
        if (!window.confirm('Are you sure you want to accept this application?')) return;
        
        try {
            await fetch(`http://localhost:8000/api/applications/${applicationId}/accept`, {
                method: 'PATCH',
                credentials: 'include'
            });
            toast.success('Application accepted!');
            setApplications(applications.filter(app => app.id !== applicationId));
        } catch (err) {
            toast.error('Failed to accept application');
        }
    };

    const handleDecline = async (applicationId) => {
        if (!window.confirm('Are you sure you want to decline this application?')) return;
        
        try {
            await fetch(`http://localhost:8000/api/applications/${applicationId}/decline`, {
                method: 'PATCH',
                credentials: 'include'
            });
            setApplications(applications.map(app => 
                app.id === applicationId ? {...app, status: 'DECLINED'} : app
            ));
            toast.success('Application declined');
        } catch (err) {
            toast.error('Failed to decline application');
        }
    };

    if (loading) return <div className="text-center my-4">Loading applications...</div>;

    return (
        <div className="container my-4">
            <h2 className="mb-4">Applications for Order #{orderId}</h2>
            
            <div className="list-group">
                {applications.map(application => (
                    <div key={application.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5>
                                    <Link 
                                        to={`/users/${application.freelancer.id}`}
                                        className="text-decoration-none"
                                    >
                                        {application.freelancer.username}
                                    </Link>
                                </h5>
                                <p className="mb-1">{application.proposal}</p>
                                <small className="text-muted">
                                    Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                            <div className="btn-group">
                                {application.status === 'PENDING' && (
                                    <>
                                        <button 
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleAccept(application.id)}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDecline(application.id)}
                                        >
                                            Decline
                                        </button>
                                    </>
                                )}
                                {application.status === 'ACCEPTED' && (
                                    <span className="badge bg-success">Accepted</span>
                                )}
                                {application.status === 'DECLINED' && (
                                    <span className="badge bg-danger">Declined</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {applications.length === 0 && (
                <div className="alert alert-info mt-4">
                    No applications found for this order
                </div>
            )}
        </div>
    );
}