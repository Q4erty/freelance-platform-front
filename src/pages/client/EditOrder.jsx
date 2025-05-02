// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { updateOrder } from '../../redux/dataSlice';

// export default function EditOrder() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const order = useSelector((state) => state.data.orders.find((order) => order.id === id));
//   const user = useSelector((state) => state.auth.user);
//   const categories = useSelector((state) => state.categories.categories);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category: '',
//     deadline: ''
//   });

//   useEffect(() => {
//     if (order) {
//       setFormData({
//         title: order.title,
//         description: order.description,
//         price: order.price,
//         category: order.category,
//         deadline: order.deadline
//       });
//     }
//   }, [order]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3001/orders/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         const updatedOrder = await response.json();
//         dispatch(updateOrder(updatedOrder));
//         if (user.role === 'client') {
//           navigate('/client/my-orders');
//         } else {
//           navigate('/admin/manage-orders');
//         }
        
//       }
//     } catch (err) {
//       console.log('EditOrder.jsx errored updating order');
//     }
//   };

//   return (
//     <div className='container my-4 d-flex justify-content-center'>
//       <div style={{ maxWidth: '600px', width: '100%' }}>
//         <h2 className='text-center mb-4' style={{ fontWeight: 'bold' }}>
//           Edit Order
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className='mb-3'>
//             <label className='form-label'>Project Title</label>
//             <input
//               type='text'
//               name='title'
//               className='form-control form-control-lg'
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Description</label>
//             <textarea
//               name='description'
//               className='form-control form-control-lg'
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Price (KZT)</label>
//             <input
//               type='number'
//               name='price'
//               className='form-control form-control-lg'
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Category</label>
//             <select
//               name='categoryId'
//               className='form-control form-control-lg'
//               value={formData.categoryId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map(c => (
//                 <option key={c.id} value={c.id}>{c.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className='mb-4'>
//             <label className='form-label'>Deadline</label>
//             <input
//               type='date'
//               name='deadline'
//               className='form-control form-control-lg'
//               value={formData.deadline}
//               onChange={handleChange}
//             />
//           </div>

//           <button type='submit' className='btn btn-primary w-100 btn-lg'>
//             Update Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { updateOrder } from '../../redux/dataSlice';

// export default function EditOrder() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const order = useSelector((state) => state.data.orders.find((order) => order.id === id));
//   const user = useSelector((state) => state.auth.user);
//   const categories = useSelector((state) => state.categories.categories);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     categoryId: '',
//     deadline: ''
//   });

//   useEffect(() => {
//     if (order) {
//       setFormData({
//         title: order.title,
//         description: order.description,
//         price: order.price,
//         categoryId: order.categoryId,
//         deadline: order.deadline
//       });
//     }
//   }, [order]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3001/orders/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         const updatedOrder = await response.json();
//         dispatch(updateOrder(updatedOrder));
//         if (user.role === 'client') {
//           navigate('/client/my-orders');
//         } else {
//           navigate('/admin/manage-orders');
//         }
//       }
//     } catch (err) {
//       console.log('EditOrder.jsx errored updating order');
//     }
//   };

//   return (
//     <div className="edit-order-container">
//       <h2 className="edit-order-title">Edit Order</h2>
//       <form onSubmit={handleSubmit} className="edit-order-form">
//         <label className="form-label">Project Title</label>
//         <input
//           type="text"
//           name="title"
//           className="form-control"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <label className="form-label">Description</label>
//         <textarea
//           name="description"
//           className="form-control"
//           rows={4}
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <label className="form-label">Price (KZT)</label>
//         <input
//           type="number"
//           name="price"
//           className="form-control"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <label className="form-label">Category</label>
//         <select
//           name="categoryId"
//           className="form-control"
//           value={formData.categoryId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>{c.name}</option>
//           ))}
//         </select>

//         <label className="form-label">Deadline</label>
//         <input
//           type="date"
//           name="deadline"
//           className="form-control"
//           value={formData.deadline}
//           onChange={handleChange}
//         />

//         <button type="submit" className="btn btn-primary w-100">
//           Update Order
//         </button>
//       </form>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { updateOrder } from '../../redux/dataSlice';
// import { toast } from 'react-toastify';

// export default function EditOrder() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const order = useSelector((state) => state.data.orders.find((order) => order.id === id));
//   const user = useSelector((state) => state.auth.user);
//   const categories = useSelector((state) => state.categories.categories);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     categoryId: '',
//     deadline: ''
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (order) {
//       const formattedDeadline = order.deadline
//         ? new Date(order.deadline).toISOString().split('T')[0]
//         : '';
//       setFormData({
//         title: order.title || '',
//         description: order.description || '',
//         price: order.price || '',
//         categoryId: order.categoryId || '',
//         deadline: formattedDeadline
//       });
//       setIsLoading(false);
//     }
//   }, [order]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const response = await fetch(`http://localhost:3001/orders/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error('Failed to update order');

//       const updatedOrder = await response.json();
//       dispatch(updateOrder(updatedOrder));
//       toast.success('Order updated successfully');
//       navigate(user.role === 'client' ? '/client/my-orders' : '/admin/manage-orders');
//     } catch (err) {
//       toast.error(err.message);
//       console.error('Error updating order:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
//         <div className="card-body">
//           <h3 className="card-title mb-4">Edit Order</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Project Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 className="form-control"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">Price (KZT)</label>
//                 <input
//                   type="number"
//                   name="price"
//                   className="form-control"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Category</label>
//                 <select
//                   name="categoryId"
//                   className="form-control"
//                   value={formData.categoryId}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>{c.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Deadline</label>
//               <input
//                 type="date"
//                 name="deadline"
//                 className="form-control"
//                 value={formData.deadline}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split('T')[0]}
//               />
//             </div>

//             <div className="d-grid gap-2">
//               <button type="submit" className="btn btn-primary">
//                 {isLoading ? 'Updating...' : 'Update Order'}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }







// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { updateOrder } from '../../redux/dataSlice';
// import { toast } from 'react-toastify';

// export default function EditOrder() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const order = useSelector((state) => state.data.orders.find((o) => o.id === id));
//   const user = useSelector((state) => state.auth.user);
//   const categories = useSelector((state) => state.categories.categories);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     categoryId: '',
//     deadline: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (order) {
//       const formattedDeadline = order.deadline
//         ? new Date(order.deadline).toISOString().split('T')[0]
//         : '';

//       setFormData({
//         title: order.title || '',
//         description: order.description || '',
//         price: order.price || '',
//         categoryId: order.categoryId || '',
//         deadline: formattedDeadline
//       });
//     }
//   }, [order]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`http://localhost:3001/orders/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error('Failed to update order');

//       const updatedOrder = await response.json();
//       dispatch(updateOrder(updatedOrder));
//       toast.success('Order updated successfully!');
//       navigate(user.role === 'client' ? '/client/my-orders' : '/admin/manage-orders');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-card">
//         <h2 className="text-center mb-4">Edit Project</h2>

//         <form onSubmit={handleSubmit} className="admin-form">
//           <div className="form-group">
//             <label className="form-label">Project Title</label>
//             <input
//               type="text"
//               className="form-control"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//               minLength={5}
//               maxLength={100}
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               rows={5}
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               required
//               minLength={20}
//               maxLength={1000}
//             />
//           </div>

//           <div className="row">
//             <div className="col-md-6">
//               <div className="form-group">
//                 <label className="form-label">Budget (KZT)</label>
//                 <div className="input-group">
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     required
//                     min={1000}
//                     step={500}
//                   />
//                   <span className="input-group-text">KZT</span>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="form-group">
//                 <label className="form-label">Deadline</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={formData.deadline}
//                   onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//                   min={new Date().toISOString().split('T')[0]}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Category</label>
//             <select
//               className="form-control"
//               value={formData.categoryId}
//               onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
//               required
//             >
//               <option value="">Select a category</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>{c.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="d-grid mt-4">
//             <button
//               type="submit"
//               className="btn btn-primary btn-lg"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Updating...
//                 </>
//               ) : 'Update Project'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to load order');

        const data = await response.json();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          categoryId: data.categoryId || '',
          deadline: data.deadline ? data.deadline.split('T')[0] : ''
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        toast.error('Failed to load categories');
      }
    };

    fetchOrder();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          deadline: formData.deadline
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to update order');

      toast.success('Order updated successfully!');
      navigate('/client/my-orders');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Edit Project</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minLength={20}
                maxLength={1000}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Budget (KZT)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min={1000}
                    step={500}
                  />
                  <span className="input-group-text">KZT</span>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
