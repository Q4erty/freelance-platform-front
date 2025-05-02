// // src/pages/admin/ManageOrders.jsx
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setOrders } from '../../redux/dataSlice';
// import { setCategories } from '../../redux/categorySlice';
// import { Link } from 'react-router-dom';

// export default function ManageOrders() {
//   const orders = useSelector((state) => state.data.orders);
//   const categories = useSelector((state) => state.categories.categories);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const ordersRes = await fetch('http://localhost:8000/api/orders');
//         const ordersData = await ordersRes.json();
//         dispatch(setOrders(ordersData));

//         const categoriesRes = await fetch('http://localhost:8000/api/categories');
//         const categoriesData = await categoriesRes.json();
//         dispatch(setCategories(categoriesData));
//       } catch (err) {
//         console.error('Loading error:', err);
//       }
//     };
//     loadData();
//   }, [dispatch]);

//   return (
//     <div className='container my-4'>
//       <h2 className='mb-4'>Orders Overview</h2>
//       <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
//         {orders.map((order) => (
//           <div key={order.id} className='col'>
//             <div className='card h-100 shadow-sm'>
//               <div className='card-body'>
//                 <h5 className='card-title'>{order.title}</h5>
//                 <h6 className='card-subtitle mb-2 text-muted'>
//                   Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}
//                 </h6>
//                 <span className={`badge ${order.status === 'COMPLETED' ? 'bg-success' : 'bg-warning'}`}>
//                   {order.status}
//                 </span>
//                 <p className='small mt-2'>{order.description}</p>
//               </div>
//               <div className='card-footer d-flex justify-content-between'>
//                 <span className='fw-bold text-success'>{order.price} KZT</span>
//                 <small className='text-muted'>Deadline: {new Date(order.deadline).toLocaleDateString()}</small>
//               </div>
//               <div className='card-footer'>
//                 <div className='d-grid'>
//                   <Link 
//                     to={`/orders/${order.id}`} 
//                     className='btn btn-outline-info btn-sm'
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setOrders } from '../../redux/dataSlice';
// import { setCategories } from '../../redux/categorySlice';
// import { Link } from 'react-router-dom';

// export default function ManageOrders() {
//   const orders = useSelector((state) => state.data.orders);
//   const categories = useSelector((state) => state.categories.categories);
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       try {
//         const ordersRes = await fetch('http://localhost:8000/api/orders');
//         const ordersData = await ordersRes.json();
//         dispatch(setOrders(ordersData));

//         const categoriesRes = await fetch('http://localhost:8000/api/categories');
//         const categoriesData = await categoriesRes.json();
//         dispatch(setCategories(categoriesData));
//       } catch (err) {
//         console.error('Loading error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, [dispatch]);

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>Orders Management</h2>
//       </div>
      
//       {isLoading ? (
//         <div className="text-center py-5">Loading orders...</div>
//       ) : orders.length === 0 ? (
//         <div className="alert alert-info">No orders found</div>
//       ) : (
//         <div className="cards-grid">
//           {orders.map((order) => (
//             <div key={order.id} className="project-card">
//               <div className="project-card-header">
//                 <h5>{order.title}</h5>
//                 <span className={`badge ${
//                   order.status === 'COMPLETED' ? 'badge-success' : 
//                   order.status === 'CANCELLED' ? 'badge-danger' : 'badge-warning'
//                 }`}>
//                   {order.status}
//                 </span>
//               </div>
//               <div className="project-card-body">
//                 <p className="text-muted mb-2">
//                   <strong>Category:</strong> {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}
//                 </p>
//                 <p className="mb-3">{order.description.substring(0, 100)}...</p>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-bold text-primary">{order.price} KZT</span>
//                   <small className="text-muted">
//                     Deadline: {new Date(order.deadline).toLocaleDateString()}
//                   </small>
//                 </div>
//               </div>
//               <div className="project-card-footer">
//                 <Link 
//                   to={`/orders/${order.id}`} 
//                   className="btn btn-outline-primary btn-sm w-100"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';
import { Link } from 'react-router-dom';

export default function ManageOrders() {
  const orders = useSelector((state) => state.data.orders);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const ordersRes = await fetch('http://localhost:8000/api/orders');
        const ordersData = await ordersRes.json();
        dispatch(setOrders(ordersData));

        const categoriesRes = await fetch('http://localhost:8000/api/categories');
        const categoriesData = await categoriesRes.json();
        dispatch(setCategories(categoriesData));
      } catch (err) {
        console.error('Loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  return (
    <div className='container my-4'>
      <div className='admin-header'>
        <h2 className='mb-4'>Orders Overview</h2>
      </div>
      
      {isLoading ? (
        <div className='text-center py-5'>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className='alert alert-info'>No orders found</div>
      ) : (
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {orders.map((order) => (
            <div key={order.id} className='col'>
              <div className='card h-100 shadow-sm'>
                <div className='card-body'>
                  <h5 className='card-title'>{order.title}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}
                  </h6>
                  <span className={`badge ${
                    order.status === 'COMPLETED' ? 'bg-success' : 
                    order.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning'
                  }`}>
                    {order.status}
                  </span>
                  <p className='small mt-2'>{order.description}</p>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                  <span className='fw-bold text-success'>{order.price} KZT</span>
                  <small className='text-muted'>Deadline: {new Date(order.deadline).toLocaleDateString()}</small>
                </div>
                <div className='card-footer'>
                  <div className='d-grid'>
                    <Link 
                      to={`/orders/${order.id}`} 
                      className='btn btn-outline-info btn-sm'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}