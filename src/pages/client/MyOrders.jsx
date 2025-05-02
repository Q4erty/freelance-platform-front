// // import { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';

// // export default function MyOrders() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { user } = useSelector(state => state.auth);
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const ordersResponse = await fetch(`http://localhost:8000/api/orders`, {
// //           credentials: 'include'
// //         });
        
// //         if (!ordersResponse.ok) throw new Error('Failed to load orders');
// //         const ordersData = await ordersResponse.json();
// //         const userOrders = ordersData.content.filter(order => order.clientId === user.id);
// //         console.log(userOrders);

// //         const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
// //           credentials: 'include'
// //         });
// //         const categoriesData = await categoriesResponse.json();

// //         setOrders(userOrders);
// //         setCategories(categoriesData);
// //       } catch (err) {
// //         toast.error(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     loadData();
// //   }, []);

// //   const filteredOrders = orders.filter(order => 
// //     selectedCategory ? order.categoryId === selectedCategory : true
// //   );

// //   const handleDelete = async (orderId) => {
// //     if (!window.confirm('Are you sure you want to delete this order?')) return;
    
// //     try {
// //       const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
// //         method: 'DELETE',
// //         credentials: 'include'
// //       });

// //       if (!response.ok) throw new Error('Failed to delete order');
      
// //       setOrders(orders.filter(order => order.id !== orderId));
// //       toast.success('Order deleted successfully');
// //     } catch (err) {
// //       toast.error(err.message);
// //     }
// //   };

// //   const handleCompleteOrder = async (orderId) => {
// //     if (!window.confirm('Mark this order as completed?')) return;
    
// //     try {
// //       const response = await fetch(`http://localhost:8000/api/orders/${orderId}/complete`, {
// //         method: 'PUT',
// //         credentials: 'include'
// //       });

// //       if (!response.ok) throw new Error('Failed to complete order');
      
// //       setOrders(orders.map(order => 
// //         order.id === orderId ? { ...order, status: 'COMPLETED' } : order
// //       ));
// //       toast.success('Order marked as completed');
// //     } catch (err) {
// //       toast.error(err.message);
// //     }
// //   };

// //   if (loading) return <div className="text-center my-4">Loading orders...</div>;

// //   return (
// //     <div className="container my-4">
// //       <h2 className="mb-4">My Orders</h2>
      
// //       <div className="row mb-4 g-3">
// //         <div className="col-md-6">
// //           <select
// //             className="form-select"
// //             value={selectedCategory}
// //             onChange={(e) => setSelectedCategory(e.target.value)}
// //           >
// //             <option value="">All Categories</option>
// //             {categories.map(c => (
// //               <option key={c.id} value={c.id}>{c.name}</option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
// //         {filteredOrders.map(order => (
// //           <div key={order.id} className="col">
// //             <div className="card h-100 shadow-sm">
// //               <div className="card-body">
// //                 <h5 className="card-title">{order.title}</h5>
// //                 <h6 className="card-subtitle mb-2 text-muted">
// //                   {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
// //                 </h6>
// //                 <p className="card-text text-muted small">{order.description}</p>
                
// //                 {order.freelancer && (
// //                   <div className="mt-2">
// //                     <span className="badge bg-info">
// //                       Assigned to: {order.freelancer.username}
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>
              
// //               <div className="card-footer bg-transparent">
// //                 <div className="d-flex justify-content-between align-items-center">
// //                   <span className="badge bg-primary">
// //                     {new Date(order.deadline).toLocaleDateString()}
// //                   </span>
// //                   <span className="fw-bold text-success">
// //                     {order.price} KZT
// //                   </span>
// //                 </div>
// //                 <div className="mt-2">
// //                   <span className={`badge ${getStatusBadgeClass(order.status)}`}>
// //                     {order.status}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="card-footer d-grid gap-2">
// //                 {!order.freelancer ? (
// //                   <>
// //                     <Link 
// //                       to={`/orders/${order.id}/applications`}
// //                       className="btn btn-outline-info btn-sm"
// //                     >
// //                       Applications
// //                     </Link>
// //                     <Link
// //                       to={`/client/edit-order/${order.id}`}
// //                       className="btn btn-outline-primary btn-sm"
// //                     >
// //                       Edit
// //                     </Link>
// //                     <button 
// //                       onClick={() => handleDelete(order.id)}
// //                       className="btn btn-outline-danger btn-sm"
// //                     >
// //                       Delete
// //                     </button>
// //                   </>
// //                 ) : (
// //                   order.status === 'IN_PROGRESS' && (
// //                     <button
// //                       className="btn btn-success btn-sm"
// //                       onClick={() => handleCompleteOrder(order.id)}
// //                     >
// //                       Mark as Completed
// //                     </button>
// //                   )
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {filteredOrders.length === 0 && (
// //         <div className="alert alert-info mt-4">
// //           No orders found. Create your first order!
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const getStatusBadgeClass = (status) => {
// //   switch(status) {
// //     case 'COMPLETED': return 'bg-success';
// //     case 'IN_PROGRESS': return 'bg-warning text-dark';
// //     case 'CANCELLED': return 'bg-danger';
// //     default: return 'bg-secondary';
// //   }
// // };


import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/orders`, { credentials: 'include' }),
          fetch(`http://localhost:8000/api/categories`, { credentials: 'include' })
        ]);

        if (!ordersRes.ok) throw new Error('Failed to load orders');
        if (!categoriesRes.ok) throw new Error('Failed to load categories');

        const [ordersData, categoriesData] = await Promise.all([
          ordersRes.json(),
          categoriesRes.json()
        ]);

        const userOrders = ordersData.content?.filter(o => o.clientId === user.id) || [];
        setOrders(userOrders);
        setCategories(categoriesData);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter(o => o.id !== id));
      toast.success('Order deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCompleteOrder = async (id) => {
    if (!window.confirm('Mark this order as completed?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}/complete`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to complete order');
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'COMPLETED' } : o));
      toast.success('Order marked as completed');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredOrders = selectedCategory 
    ? orders.filter(o => o.categoryId === parseInt(selectedCategory))
    : orders;

  if (loading) return <div className="text-center my-5 py-5">Loading orders...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Orders</h2>
      </div>

      <div className="mb-4">
        <select 
          className="form-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          {selectedCategory 
            ? 'No orders found in this category'
            : 'No orders found. Create your first order!'}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{order.title}</h5>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </div>
                  
                  <h6 className="card-subtitle text-muted mb-3">
                    {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
                  </h6>
                  
                  <p className="card-text text-muted small mb-3">{order.description}</p>
                  
                  {order.freelancer && (
                    <div className="mb-3">
                      <span className="badge bg-info bg-opacity-10 text-info">
                        Assigned to: {order.freelancer.username}
                      </span>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">
                      Deadline: {order.deadline ? new Date(order.deadline).toLocaleDateString() : 'No deadline'}
                    </span>
                    <span className="fw-bold text-success">
                      {order.price} KZT
                    </span>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-0 pt-0">
                  <div className="d-grid gap-2">
                    {!order.freelancer ? (
                      <>
                        <Link 
                          to={`/orders/${order.id}/applications`}
                          className="btn btn-info text-white"
                        >
                          View Applications
                        </Link>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/client/edit-order/${order.id}`}
                            className="btn btn-primary flex-grow-1"
                            style={{ marginTop: 0 }}
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(order.id)}
                            className="btn btn-danger flex-grow-1"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    ) : (
                      order.status === 'IN_PROGRESS' && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleCompleteOrder(order.id)}
                        >
                          Mark as Completed
                        </button>
                      )
                    )}
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

const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'COMPLETED': return 'bg-success text-white';
    case 'IN_PROGRESS': return 'bg-warning text-dark';
    case 'CANCELLED': return 'bg-danger text-white';
    default: return 'bg-secondary text-white';
  }
};

const formatStatus = (status) => {
  return status ? status.replace('_', ' ') : 'Unknown';
};


