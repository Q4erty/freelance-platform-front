// // import { useEffect, useState } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { toast } from 'react-toastify';
// // import { Link } from 'react-router-dom';

// // export default function ManageUsers() {
// //   const [users, setUsers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const dispatch = useDispatch();
// //   const { user } = useSelector(state => state.auth);

// //   useEffect(() => {
// //     loadUsers();
// //   }, []);

// //   const loadUsers = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8000/api/admin/users', {
// //         credentials: 'include'
// //       });
      
// //       if (!response.ok) throw new Error('Failed to load users');
      
// //       const data = await response.json();
// //       setUsers(data);
// //     } catch (err) {
// //       toast.error(err.message);
// //     }
// //   };

// //   const handleToggleBlock = async (userId) => {
// //     if (!window.confirm('Are you sure you want to change user status?')) return;
    
// //     try {
// //       const response = await fetch(`http://localhost:8000/api/admin/toggle-block/${userId}`, {
// //         method: 'POST',
// //         credentials: 'include'
// //       });

// //       if (!response.ok) throw new Error('Failed to update user status');
      
// //       setUsers(users.map(u => 
// //         u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
// //       ));
// //       toast.success('User status updated');
// //     } catch (err) {
// //       toast.error(err.message);
// //     }
// //   };

// //   const filteredUsers = users.filter(user => 
// //     user.username.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="container my-4">
// //       <h2>User Management</h2>
      
// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           className="form-control"
// //           placeholder="Search users..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       <div className="table-responsive">
// //         <table className="table table-hover">
// //           <thead className="table-dark">
// //             <tr>
// //               <th>Username</th>
// //               <th>Role</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredUsers.map(user => (
// //               <tr key={user.id}>
// //                 <td>
// //                   <Link to={`/users/${user.id}`} className="text-decoration-none">
// //                     {user.username}
// //                   </Link>
// //                 </td>
// //                 <td>{user.role}</td>
// //                 <td>
// //                   <span className={`badge ${user.isBlocked ? 'bg-danger' : 'bg-success'}`}>
// //                     {user.isBlocked ? 'Blocked' : 'Active'}
// //                   </span>
// //                 </td>
// //                 <td>
// //                   <button 
// //                     className={`btn btn-sm ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
// //                     onClick={() => handleToggleBlock(user.id)}
// //                   >
// //                     {user.isBlocked ? 'Unblock' : 'Block'}
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/admin/users', {
//         credentials: 'include'
//       });
      
//       if (!response.ok) throw new Error('Failed to load users');
      
//       const data = await response.json();
//       setUsers(data);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleToggleBlock = async (userId) => {
//     if (!window.confirm('Are you sure you want to change user status?')) return;
    
//     setIsUpdating(true);
//     try {
//       const response = await fetch(`http://localhost:8000/api/admin/toggle-block/${userId}`, {
//         method: 'POST',
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to update user status');
      
//       setUsers(users.map(u => 
//         u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
//       ));
//       toast.success('User status updated');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const filteredUsers = users.filter(user => 
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>User Management</h2>
//         <div style={{ width: '300px' }}>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>
      
//       <div className="admin-card">
//         {isLoading ? (
//           <div className="text-center py-4">Loading users...</div>
//         ) : filteredUsers.length === 0 ? (
//           <div className="alert alert-info">
//             {searchTerm ? 'No users match your search' : 'No users found'}
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map(user => (
//                   <tr key={user.id}>
//                     <td>
//                       <Link to={`/users/${user.id}`} className="d-flex align-items-center text-decoration-none">
//                         {user.avatarPath ? (
//                           <img 
//                             src={`http://localhost:8000/avatars/${user.avatarPath}`} 
//                             className="rounded-circle me-2" 
//                             width="32" 
//                             height="32" 
//                             alt={user.username}
//                           />
//                         ) : (
//                           <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2" 
//                             style={{ width: '32px', height: '32px' }}>
//                             {user.username[0].toUpperCase()}
//                           </div>
//                         )}
//                         {user.username}
//                       </Link>
//                     </td>
//                     <td>{user.email}</td>
//                     <td>
//                       <span className="badge badge-primary">
//                         {user.role.replace('ROLE_', '')}
//                       </span>
//                     </td>
//                     <td>
//                       <span className={`badge ${user.isBlocked ? 'badge-danger' : 'badge-success'}`}>
//                         {user.isBlocked ? 'Blocked' : 'Active'}
//                       </span>
//                     </td>
//                     <td>
//                       <button 
//                         className={`btn btn-sm ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
//                         onClick={() => handleToggleBlock(user.id)}
//                         disabled={isUpdating}
//                       >
//                         {user.isBlocked ? 'Unblock' : 'Block'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/admin/users', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to load users');
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBlock = async (userId) => {
    if (userId === currentUser.id) {
      toast.warning('You cannot block yourself');
      return;
    }
    
    if (!window.confirm('Are you sure you want to change user status?')) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/toggle-block/${userId}`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to update user status');
      
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
      ));
      toast.success('User status updated');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <div className="w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="alert alert-info text-center">
              {searchTerm ? 'No users match your search' : 'No users found'}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`} className="d-flex align-items-center text-decoration-none">
                          {user.avatarPath ? (
                            <img 
                              src={`http://localhost:8000/avatars/${user.avatarPath}`} 
                              className="rounded-circle me-2" 
                              width="36" 
                              height="36" 
                              alt={user.username}
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2" 
                              style={{ 
                                width: '36px', 
                                height: '36px',
                                backgroundColor: '#f0f0f0',
                                color: '#333',
                                fontWeight: 'bold'
                              }}>
                              {user.username[0].toUpperCase()}
                            </div>
                          )}
                          <span>{user.username}</span>
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${
                          user.role === 'ROLE_ADMIN' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {user.role.replace('ROLE_', '')}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          user.isBlocked ? 'bg-danger' : 'bg-success'
                        }`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={`btn btn-sm ${
                            user.isBlocked ? 'btn-success' : 'btn-danger'
                          }`}
                          onClick={() => handleToggleBlock(user.id)}
                          disabled={isUpdating || user.id === currentUser.id}
                        >
                          {isUpdating ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : user.isBlocked ? (
                            'Unblock'
                          ) : (
                            'Block'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}