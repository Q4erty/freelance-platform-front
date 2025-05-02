import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/users', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to load users');
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleBlock = async (userId) => {
    if (!window.confirm('Are you sure you want to change user status?')) return;
    
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
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2>User Management</h2>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className="text-decoration-none">
                    {user.username}
                  </Link>
                </td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge ${user.isBlocked ? 'bg-danger' : 'bg-success'}`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td>
                  <button 
                    className={`btn btn-sm ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => handleToggleBlock(user.id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}