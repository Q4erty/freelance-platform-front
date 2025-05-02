// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function CreateOrder() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     categoryId: '',
//     deadline: ''
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/categories', {
//           credentials: 'include'
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setCategories(data);
//         }
//       } catch (err) {
//         toast.error('Failed to load categories: ' + err.message);
//       }
//     };
//     loadCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...formData,
//           price: parseFloat(formData.price),
//           deadline: formData.deadline
//         }),
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || 'Failed to create order');

//       toast.success('Order created successfully!');
//       navigate('/client/my-orders');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='container my-4 d-flex justify-content-center'>
//       <div style={{ maxWidth: 600, width: '100%' }}>
//         <h2 className='text-center mb-4'>Create New Order</h2>
//         <form onSubmit={handleSubmit}>
//           <div className='mb-3'>
//             <label className='form-label'>Project Title</label>
//             <input
//               type='text'
//               className='form-control'
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               required
//               minLength={5}
//               maxLength={100}
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Description</label>
//             <textarea
//               className='form-control'
//               rows={4}
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               required
//               minLength={20}
//               maxLength={1000}
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Price (KZT)</label>
//             <input
//               type='number'
//               className='form-control'
//               value={formData.price}
//               onChange={(e) => setFormData({...formData, price: e.target.value})}
//               required
//               min={1000}
//               step={500}
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Category</label>
//             <select
//               className='form-control'
//               value={formData.categoryId}
//               onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
//               required
//             >
//               <option value=''>Select Category</option>
//               {categories.map(c => (
//                 <option key={c.id} value={c.id}>{c.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className='mb-4'>
//             <label className='form-label'>Deadline</label>
//             <input
//               type='date'
//               className='form-control'
//               value={formData.deadline}
//               onChange={(e) => setFormData({...formData, deadline: e.target.value})}
//               min={new Date().toISOString().split('T')[0]}
//               required
//             />
//           </div>

//           <button 
//             type='submit' 
//             className='btn btn-primary w-100'
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Order'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }












// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function CreateOrder() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     categoryId: '',
//     deadline: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const loadCategories = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch('http://localhost:8000/api/categories', {
//           credentials: 'include'
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCategories(data);
//         }
//       } catch (err) {
//         toast.error('Failed to load categories');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...formData,
//           price: parseFloat(formData.price),
//           deadline: formData.deadline
//         }),
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || 'Failed to create order');

//       toast.success('Order created successfully!');
//       navigate('/client/my-orders');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
//         <div className="card-body">
//           <h3 className="text-center mb-4">Create New Project</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Project Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 required
//                 minLength={5}
//                 maxLength={100}
//                 placeholder="Website Development for E-commerce"
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 rows={5}
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 required
//                 minLength={20}
//                 maxLength={1000}
//                 placeholder="Describe your project in detail..."
//               />
//             </div>

//             <div className="row mb-3">
//               <div className="col-md-6">
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
//                     placeholder="5000"
//                   />
//                   <span className="input-group-text">KZT</span>
//                 </div>
//               </div>

//               <div className="col-md-6">
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

//             <div className="mb-4">
//               <label className="form-label">Category</label>
//               <select
//                 className="form-control"
//                 value={formData.categoryId}
//                 onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
//                 required
//                 disabled={isLoading}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="d-grid">
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg"
//                 disabled={isSubmitting || isLoading}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" />
//                     Creating...
//                   </>
//                 ) : (
//                   'Create Project'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateOrder() {
  const navigate = useNavigate();
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
    const loadCategories = async () => {
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
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          deadline: formData.deadline
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to create order');

      toast.success('Order created successfully!');
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
          <h3 className="text-center mb-4">Create New Project</h3>
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
                placeholder="Website Development for E-commerce"
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
                placeholder="Describe your project in detail..."
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
                    placeholder="5000"
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
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Creating...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
