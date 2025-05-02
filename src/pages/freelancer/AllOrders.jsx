// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function AllOrders() {
//   const [orders, setOrders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { user } = useSelector(state => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         // Загрузка заказов
//         const ordersResponse = await fetch('http://localhost:8000/api/orders', {
//           credentials: 'include'
//         });
//         const ordersData = await ordersResponse.json();
//         const availableOrders = ordersData.content.filter(order => order.freelancerId === null);

//         const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
//           credentials: 'include'
//         });
//         const categoriesData = await categoriesResponse.json();

//         setOrders(availableOrders);
//         setCategories(categoriesData);
//       } catch (err) {
//         toast.error('Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   const handleApply = async (orderId) => {
//     if (!window.confirm('Submit application for this order?')) return;
    
//     try {
//       const response = await fetch('http://localhost:8000/api/applications', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           orderId,
//           proposal: `Application from ${user.username}`
//         }),
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Application failed');
      
//       toast.success('Application submitted!');
//       setOrders(orders.filter(order => order.id !== orderId));
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory ? 
//       order.categoryId.toString() === selectedCategory : true;
//     return matchesSearch && matchesCategory;
//   });

//   if (loading) return <div className="text-center my-4">Loading orders...</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-4">Available Orders</h2>
      
//       {/* Фильтры */}
//       <div className="row mb-4 g-3">
//         <div className="col-md-6">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="col-md-6">
//           <select
//             className="form-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Список заказов */}
//       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//         {filteredOrders.map(order => (
//           <div key={order.id} className="col">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">{order.title}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">
//                   {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
//                 </h6>
//                 <p className="card-text text-muted small">{order.description}</p>
//               </div>
              
//               <div className="card-footer bg-transparent">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="badge bg-primary">
//                     {new Date(order.deadline).toLocaleDateString()}
//                   </span>
//                   <span className="fw-bold text-success">
//                     {order.price} KZT
//                   </span>
//                 </div>
//               </div>

//               <div className="card-footer d-grid">
//                 <button 
//                   className="btn btn-outline-success"
//                   onClick={() => handleApply(order.id)}
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredOrders.length === 0 && (
//         <div className="alert alert-info mt-4">
//           No available orders found
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Загрузка заказов
        const ordersResponse = await fetch('http://localhost:8000/api/orders', {
          credentials: 'include'
        });
        const ordersData = await ordersResponse.json();
        const availableOrders = ordersData.content.filter(order => order.freelancerId === null);

        const categoriesResponse = await fetch('http://localhost:8000/api/categories', {
          credentials: 'include'
        });
        const categoriesData = await categoriesResponse.json();

        setOrders(availableOrders);
        setCategories(categoriesData);
      } catch (err) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleApply = async (orderId) => {
    if (!window.confirm('Submit application for this order?')) return;
    
    try {
      const response = await fetch('http://localhost:8000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          proposal: `Application from ${user.username}`
        }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Application failed');
      
      toast.success('Application submitted!');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? 
      order.categoryId.toString() === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center my-4">Loading orders...</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Available Orders</h2>
      
      {/* Фильтры */}
      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Список заказов */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{order.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {categories.find(c => c.id === order.categoryId)?.name || 'Unknown Category'}
                </h6>
                <p className="card-text text-muted small">{order.description}</p>
              </div>
              
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">
                    {new Date(order.deadline).toLocaleDateString()}
                  </span>
                  <span className="fw-bold text-success">
                    {order.price} KZT
                  </span>
                </div>
              </div>

              <div className="card-footer d-grid">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApply(order.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="alert alert-info mt-4">
          No available orders found
        </div>
      )}
    </div>
  );
}