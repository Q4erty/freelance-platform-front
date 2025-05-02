// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function UserProfile() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
//           credentials: 'include'
//         });
        
//         if (!response.ok) throw new Error('User not found');
        
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadUser();
//   }, [userId]);

//   if (loading) return <div className="text-center my-4">Loading...</div>;
//   if (!user) return <div className="alert alert-danger">User not found</div>;

//   return (
//     <div className="container my-4">
//       <div className="card shadow">
//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col-md-4 text-center">
//               {/* <img
//                 src={`http://localhost:8000/avatars/${user.avatarPath}`}
//                 className="img-fluid rounded-circle mb-3"
//                 style={{ width: '200px', height: '200px', objectFit: 'cover' }}
//                 alt="User avatar"
//               /> */}
//               <div className="col-md-4 text-center">
//                 <div className="avatar-container">
//                   <img
//                     src={`http://localhost:8000/avatars/${user.avatarPath}`}
//                     alt="User avatar"
//                   />
//                 </div>
//               </div>

//             </div>
//             <div className="col-md-8">
//               <h2 className="mb-3">{user.username}</h2>
//               <dl className="row">
//                 <dt className="col-sm-3">Email:</dt>
//                 <dd className="col-sm-9">{user.email}</dd>

//                 <dt className="col-sm-3">Role:</dt>
//                 <dd className="col-sm-9 text-capitalize">{user.role.toLowerCase()}</dd>

//                 <dt className="col-sm-3">Status:</dt>
//                 <dd className="col-sm-9">
//                   <span className={`badge ${user.isBlocked ? 'bg-danger' : 'bg-success'}`}>
//                     {user.isBlocked ? 'Blocked' : 'Active'}
//                   </span>
//                 </dd>

//                 <dt className="col-sm-3">Rating:</dt>
//                 <dd className="col-sm-9">
//                   {user.averageRating} ({user.ratingCount} reviews)
//                 </dd>
//               </dl>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function UserProfile() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
//           credentials: 'include'
//         });
        
//         if (!response.ok) throw new Error('User not found');
        
//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadUser();
//   }, [userId]);

//   if (loading) return (
//     <div className="admin-container">
//       <div className="text-center my-5 py-5">Loading user data...</div>
//     </div>
//   );
  
//   if (!user) return (
//     <div className="admin-container">
//       <div className="alert alert-danger">User not found</div>
//     </div>
//   );

//   return (
//     <div className="admin-container">
//       <div className="admin-card">
//         <div className="row">
//           <div className="col-md-4 text-center">
//             {user.avatarPath ? (
//               <img
//                 src={`http://localhost:8000/avatars/${user.avatarPath}`}
//                 className="img-fluid rounded-circle mb-4"
//                 style={{ width: '200px', height: '200px', objectFit: 'cover' }}
//                 alt="User avatar"
//               />
//             ) : (
//               <div 
//                 className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-4"
//                 style={{ width: '200px', height: '200px' }}
//               >
//                 <span style={{ fontSize: '4rem' }}>{user.username[0].toUpperCase()}</span>
//               </div>
//             )}
            
//             <h3 className="mb-1">{user.username}</h3>
//             <span className={`badge ${
//               user.role === 'ROLE_ADMIN' ? 'badge-primary' : 
//               user.role === 'ROLE_CLIENT' ? 'badge-success' : 'badge-warning'
//             }`}>
//               {user.role.replace('ROLE_', '')}
//             </span>
//           </div>
          
//           <div className="col-md-8">
//             <div className="mb-4">
//               <h4 className="border-bottom pb-2 mb-3">Profile Information</h4>
//               <div className="row mb-3">
//                 <div className="col-sm-4 fw-bold">Email:</div>
//                 <div className="col-sm-8">{user.email}</div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-sm-4 fw-bold">Status:</div>
//                 <div className="col-sm-8">
//                   <span className={`badge ${user.isBlocked ? 'badge-danger' : 'badge-success'}`}>
//                     {user.isBlocked ? 'Blocked' : 'Active'}
//                   </span>
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-sm-4 fw-bold">Rating:</div>
//                 <div className="col-sm-8">
//                   <div className="d-flex align-items-center">
//                     <div className="stars me-2">
//                       {[...Array(5)].map((_, index) => (
//                         <span
//                           key={index}
//                           className={`star ${user.averageRating > index ? 'filled' : ''}`}
//                           style={{ color: user.averageRating > index ? '#ffc107' : '#e9ecef' }}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                     {user.averageRating.toFixed(1)} ({user.ratingCount} ratings)
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {user.bio && (
//               <div className="mb-4">
//                 <h4 className="border-bottom pb-2 mb-3">About</h4>
//                 <p>{user.bio}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          credentials: 'include',
        });

        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div className="text-center my-4">Loading...</div>;
  if (!user) return <div className="alert alert-danger">User not found</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <img
            src={`http://localhost:8000/avatars/${user.avatarPath}`}
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="profile-right">
          <h2>{user.username}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role.toLowerCase()}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={user.isBlocked ? 'status blocked' : 'status active'}>
              {user.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </p>
          <p><strong>Rating:</strong> {user.averageRating} ⭐ ({user.ratingCount} reviews)</p>
        </div>
      </div>
    </div>
  );
}
