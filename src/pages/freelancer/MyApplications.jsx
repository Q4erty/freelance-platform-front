// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function MyApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useSelector(state => state.auth);
//   const [selectedStatus, setSelectedStatus] = useState('ALL');

//   useEffect(() => {
//     const loadApplications = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/applications/freelancer/${user.id}`, {
//           credentials: 'include'
//         });
        
//         if (!response.ok) throw new Error('Failed to load applications');
        
//         const data = await response.json();
//         console.log('Applications data:', data);
//         setApplications(data);
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (user?.id) loadApplications();
//   }, [user]);

//   const handleCancel = async (applicationId) => {
//     if (!window.confirm('Are you sure you want to cancel this application?')) return;
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/applications/${applicationId}`, {
//         method: 'DELETE',
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to cancel application');
      
//       setApplications(applications.filter(app => app.id !== applicationId));
//       toast.success('Application cancelled');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const filteredApplications = applications.filter(app => 
//     selectedStatus === 'ALL' || app.status === selectedStatus
//   );

//   if (loading) return <div className="text-center my-4">Loading applications...</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-4">My Applications</h2>
      
//       <div className="row mb-4 g-3">
//         <div className="col-md-4">
//           <select
//             className="form-select"
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//           >
//             <option value="ALL">All Statuses</option>
//             <option value="PENDING">Pending</option>
//             <option value="ACCEPTED">Accepted</option>
//             <option value="DECLINED">Declined</option>
//           </select>
//         </div>
//       </div>

//       <div className="row row-cols-1 row-cols-lg-2 g-4">
//         {filteredApplications.map(application => (
//           <div key={application.id} className="col">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <div className="d-flex justify-content-between align-items-start">
//                   <div>
//                     {/* Добавляем проверку на существование order */}
//                     {application.order ? (
//                       <h5>
//                         <Link 
//                           to={`/orders/${application.order.id}`}
//                           className="text-decoration-none"
//                         >
//                           {application.order.title}
//                         </Link>
//                       </h5>
//                     ) : (
//                       <h5 className="text-danger">Order not found</h5>
//                     )}
                    
//                     <p className="text-muted small mb-2">{application.proposal}</p>
//                     <div className="d-flex gap-2">
//                       <span className={`badge ${getStatusBadgeClass(application.status)}`}>
//                         {application.status}
//                       </span>
//                       <span className="text-muted">
//                         Applied: {new Date(application.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="btn-group">
//                     {application.status === 'PENDING' && (
//                       <button 
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => handleCancel(application.id)}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Добавляем проверку на существование order */}
//               {application.order && (
//                 <div className="card-footer bg-transparent">
//                   <div className="d-flex justify-content-between">
//                     <span className="text-success fw-bold">
//                       {application.order.price} KZT
//                     </span>
//                     <span className="text-muted">
//                       Deadline: {new Date(application.order.deadline).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredApplications.length === 0 && (
//         <div className="alert alert-info mt-4">
//           {applications.length === 0 
//             ? "You haven't applied to any orders yet"
//             : "No applications match selected status"}
//         </div>
//       )}
//     </div>
//   );
// }

// const getStatusBadgeClass = (status) => {
//   switch(status) {
//     case 'ACCEPTED': return 'bg-success';
//     case 'DECLINED': return 'bg-danger';
//     default: return 'bg-warning text-dark';
//   }
// };



import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/applications/freelancer/${user.id}`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to load applications');

        const data = await response.json();
        console.log('Applications data:', data);
        setApplications(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) loadApplications();
  }, [user]);

  const handleCancel = async (applicationId) => {
    if (!window.confirm('Are you sure you want to cancel this application?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/applications/${applicationId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to cancel application');

      setApplications(applications.filter(app => app.id !== applicationId));
      toast.success('Application cancelled');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredApplications = applications.filter(app =>
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
        {filteredApplications.map(application => (
          <div key={application.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    {application.order ? (
                      <h5>
                        <Link
                          to={`/orders/${application.order.id}`}
                          className="text-decoration-none"
                        >
                          {application.order.title}
                        </Link>
                      </h5>
                    ) : (
                      <h5 className="text-danger">Order not found</h5>
                    )}

                    <p className="text-muted small mb-2">{application.proposal}</p>
                    <div className="d-flex gap-2">
                      <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                      <span className="text-muted">
                        Applied: {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="btn-group">
                    {application.status === 'PENDING' && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleCancel(application.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {application.order && (
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <span className="text-success fw-bold">
                      {application.order.price ? `${application.order.price} KZT` : 'Price not set'}
                    </span>
                    <span className="text-muted">
                      Deadline: {
                        application.order.deadline && !isNaN(new Date(application.order.deadline))
                          ? new Date(application.order.deadline).toLocaleDateString()
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

      {filteredApplications.length === 0 && (
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
    case 'ACCEPTED': return 'bg-success';
    case 'DECLINED': return 'bg-danger';
    default: return 'bg-warning text-dark';
  }
};
