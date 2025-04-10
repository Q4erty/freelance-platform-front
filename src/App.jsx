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

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />

          <Route
            path='/admin/manage-orders'
            element={user?.role === 'admin' ? <ManageOrders /> : <Navigate to='/dashboard' />}
          />

          <Route
            path='/client/my-orders'
            element={user?.role === 'client' ? <MyOrders /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/client/create-order'
            element={user?.role === 'client' ? <CreateOrder /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/client/edit-order/:id'
            element={user?.role === 'client' ? <EditOrder /> : <Navigate to='/dashboard' />}
          />

          <Route
            path='/freelancer/all-orders'
            element={user?.role === 'freelancer' ? <AllOrders /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/freelancer/my-applications'
            element={user?.role === 'freelancer' ? <MyApplications /> : <Navigate to='/dashboard' />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
