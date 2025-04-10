import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='container py-4'>
      {user ? (
        <div className='card shadow-sm'>
          <div className='card-body'>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center' style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                {user.name}
              </div>
              <div className='ms-3'>
                <h2>{user.name}</h2>
                <div>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='alert alert-info text-center'>
          <h2>Welcome to FreelanceHub</h2>
          <p>Connect with top professionals or find perfect projects in our secure ecosystem.</p>
        </div>
      )}
    </div>
  );
}
