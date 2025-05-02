import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageOrders from './pages/admin/ManageOrders';
import MyOrders from './pages/client/MyOrders';
import CreateOrder from './pages/client/CreateOrder';
import AllOrders from './pages/freelancer/AllOrders';
import MyApplications from './pages/freelancer/MyApplications';
import EditOrder from './pages/client/EditOrder';
import ManageCategories from './pages/admin/ManageCategories';
import ManageUsers from './pages/admin/ManageUsers';
import UserProfile from './pages/admin/UserProfile';
import OrderApplications from './pages/client/OrderApplications';
import FreelancerMyOrders from './pages/freelancer/FreelancerMyOrders';

export default function App() {
  const user = useSelector((state) => state.auth.user);

  const userRole = user?.role;
  console.log('User Role:', userRole);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={<Dashboard />} />

          <Route
            path='/admin/manage-orders'
            element={userRole === 'ROLE_ADMIN' ? <ManageOrders /> : <Navigate to='/dashboard' />}
          />

          <Route
            path='/client/my-orders'
            element={userRole === 'ROLE_CLIENT' ? <MyOrders /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/client/create-order'
            element={userRole === 'ROLE_CLIENT' ? <CreateOrder /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/client/edit-order/:id'
            element={userRole === 'ROLE_CLIENT' || userRole === 'ROLE_ADMIN' ? <EditOrder /> : <Navigate to='/dashboard' />}
          />

          <Route
            path='/freelancer/all-orders'
            element={userRole === 'ROLE_FREELANCER' ? <AllOrders /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/freelancer/my-applications'
            element={userRole === 'ROLE_FREELANCER' ? <MyApplications /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/admin/manage-categories'
            element={userRole === 'ROLE_ADMIN' ? <ManageCategories /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/admin/manage-users'
            element={userRole === 'ROLE_ADMIN' ? <ManageUsers /> : <Navigate to='/dashboard' />}
          />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route 
            path="/orders/:orderId/applications" 
            element={<OrderApplications />}
          />
          <Route
            path='/freelancer/my-orders'
            element={userRole === 'ROLE_FREELANCER' ? <FreelancerMyOrders /> : <Navigate to='/dashboard' />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
