// import { useSelector } from 'react-redux';

// export default function Home() {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="container py-4">
//       {user ? (
//         <div className="card shadow-lg p-4 border-0 rounded-3">
//           <div className="card-body">
//             <div className="d-flex align-items-center">
              
//               <div
//                 className="avatar rounded-circle overflow-hidden bg-light d-flex justify-content-center align-items-center"
//                 style={{
//                   width: '80px',
//                   height: '80px',
//                   fontSize: '32px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {user.avatarPath ? (
//                   <img
//                     src={`http://localhost:8000/avatars/${user.avatarPath}`}
//                     alt={user.username}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                 ) : (
//                   <span className="text-primary">{user.username[0].toUpperCase()}</span>
//                 )}
//               </div>
//               <div className="ms-4">
//                 <h2 className="text-dark">{user.username}</h2>
//                 <p className="text-muted">{user.email}</p>
//                 <p className="text-secondary">Role: {user.role ? user.role.toUpperCase() : 'Not Set'}</p>
//               </div>
//             </div>

//             <div className="mt-3">
//               <h5 className="text-dark">Rating: </h5>
//               <div className="d-flex align-items-center">
//                 <div className="stars">
//                   {[...Array(5)].map((_, index) => (
//                     <span
//                       key={index}
//                       className={`star ${user.averageRating > index ? 'filled' : ''}`}
//                       style={{ fontSize: '24px', color: user.averageRating > index ? '#f39c12' : '#bdc3c7' }}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <p className="ms-3">{user.averageRating} ({user.ratingCount} ratings)</p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <h5 className="text-dark">Welcome back, {user.username}!</h5>
//               <p className="text-muted">
//                 We're glad to have you. Start exploring projects or connect with
//                 talented freelancers today.
//               </p>
//               <button className="btn btn-primary">Go to Dashboard</button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="alert alert-info text-center p-5 rounded-3">
//           <h2 className="display-4">Welcome to FreelanceHub!</h2>
//           <p className="lead">
//             Connect with top professionals or find the perfect project in our
//             secure ecosystem.
//           </p>
//           <button className="btn btn-outline-primary btn-lg">Get Started</button>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useSelector } from 'react-redux';

// export default function Home() {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="container py-4">
//       {user ? (
//         <div className="profile-card">
//           <div className="profile-header">
//             <div className="avatar-container">
//               {user.avatarPath ? (
//                 <img
//                   src={`http://localhost:8000/avatars/${user.avatarPath}`}
//                   alt={user.username}
//                 />
//               ) : (
//                 <div className="avatar-initial">
//                   {user.username[0].toUpperCase()}
//                 </div>
//               )}
//             </div>
//             <h2>{user.username}</h2>
//             <p className="user-meta">{user.email}</p>
//           </div>

//           <div className="user-info">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <div>
//                 <h3>Account Overview</h3>
//                 <p className="text-muted">Role: {user.role ? user.role.replace('ROLE_', '') : 'Not Set'}</p>
//               </div>
//               <span className="badge bg-primary rounded-pill px-3 py-2">
//                 {user.role === 'ROLE_ADMIN' ? 'Administrator' : 
//                  user.role === 'ROLE_CLIENT' ? 'Client' : 
//                  user.role === 'ROLE_FREELANCER' ? 'Freelancer' : 'Member'}
//               </span>
//             </div>

//             <div className="rating">
//               <div className="stars">
//                 {[...Array(5)].map((_, index) => (
//                   <span
//                     key={index}
//                     className={`star ${user.averageRating > index ? 'filled' : ''}`}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <span className="ms-2">
//                 {user.averageRating.toFixed(1)} ({user.ratingCount} ratings)
//               </span>
//             </div>

//             <div className="welcome-message">
//               <h5>Welcome back, {user.username}!</h5>
//               <p className="mb-3">
//                 We're glad to have you back. Check your latest notifications or explore new opportunities.
//               </p>
//               <button className="btn btn-primary px-4">Go to Dashboard</button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="alert alert-light text-center p-5 rounded-3 shadow-sm">
//           <h2 className="display-5 fw-bold mb-4">Welcome to FreelanceHub</h2>
//           <p className="lead mb-4">
//             The premier platform connecting businesses with top freelance talent worldwide.
//             Start your journey today.
//           </p>
//           <div className="d-flex justify-content-center gap-3">
//             <button className="btn btn-primary btn-lg px-4">Get Started</button>
//             <button className="btn btn-outline-primary btn-lg px-4">Learn More</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container py-5">
      {user ? (
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="row g-0">
            {/* Аватар и основная информация */}
            <div className="col-md-4 bg-light p-4 d-flex flex-column align-items-center">
              <div className="avatar mb-3" style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
              }}>
                {user.avatarPath ? (
                  <img
                    src={`http://localhost:8000/avatars/${user.avatarPath}`}
                    alt={user.username}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-primary" 
                    style={{ fontSize: '48px', fontWeight: 'bold' }}>
                    {user.username[0].toUpperCase()}
                  </div>
                )}
              </div>
              
              <h2 className="h3 text-center">{user.username}</h2>
              <p className="text-muted text-center">{user.email}</p>
              
              <div className="mt-2 mb-4">
                <span className={`badge ${
                  user.role === 'ROLE_ADMIN' ? 'bg-danger' :
                  user.role === 'ROLE_FREELANCER' ? 'bg-success' : 'bg-primary'
                } rounded-pill px-3 py-2`}>
                  {user.role ? user.role.replace('ROLE_', '') : 'GUEST'}
                </span>
              </div>
            </div>

            {/* Детали профиля */}
            <div className="col-md-8 p-4">
              <div className="mb-4">
                <h3 className="mb-3">Profile Overview</h3>
                
                {/* Рейтинг */}
                <div className="mb-4">
                  <h5 className="mb-2">Your Rating</h5>
                  <div className="d-flex align-items-center">
                    <div className="stars me-2">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${user.averageRating > index ? 'text-warning' : 'text-muted'}`}
                          style={{ fontSize: '24px' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-muted">
                      {user.averageRating?.toFixed(1) || '0.0'} ({user.ratingCount || 0} ratings)
                    </span>
                  </div>
                </div>

                {/* Приветственное сообщение */}
                <div className="welcome-message bg-light p-3 rounded-3">
                  <h5 className="text-primary">Welcome back, {user.username}!</h5>
                  <p className="mb-0">
                    {user.role === 'ROLE_FREELANCER' 
                      ? 'Check your latest project offers or update your portfolio.'
                      : user.role === 'ROLE_CLIENT'
                      ? 'Find the perfect freelancer for your next project.'
                      : 'Manage the platform and help our community grow.'}
                  </p>
                </div>

                {/* Действия */}
                <div className="mt-4 d-flex gap-3">
                  <Link to="/dashboard" className="btn btn-primary px-4">
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero-section text-center p-5 rounded-4 bg-light shadow-sm">
          <h1 className="display-5 fw-bold mb-4">Welcome to FreelanceHub</h1>
          <p className="lead mb-4">
            Connect with top professionals or find the perfect project in our secure ecosystem.
            Join thousands of satisfied users today.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-outline-primary btn-lg px-4">
              Learn More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}