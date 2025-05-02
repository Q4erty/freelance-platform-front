// // src/pages/admin/ManageCategories.jsx
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
// import { toast } from 'react-toastify';

// export default function ManageCategories() {
//   const dispatch = useDispatch();
//   const { categories } = useSelector(state => state.categories);
//   const { token } = useSelector(state => state.auth);
//   const [newCategory, setNewCategory] = useState('');

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         credentials: 'include',
//       });
//       const data = await response.json();
//       dispatch(setCategories(data));
//     } catch (err) {
//       toast.error('Failed to load categories');
//     }
//   };

//   const handleAdd = async () => {
//     if (!newCategory.trim()) {
//       toast.error('Category name cannot be empty');
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: newCategory }),
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to create category');

//       const createdCategory = await response.json();
//       dispatch(addCategory(createdCategory));
//       setNewCategory('');
//       toast.success('Category created successfully');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
//         method: 'DELETE',
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to delete category');

//       dispatch(deleteCategory(id));
//       toast.success('Category deleted');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="container my-4">
//       <h2>Manage Categories</h2>
      
//       <div className="mb-4">
//         <div className="input-group">
//           <input
//             type="text"
//             className="form-control"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="New category name"
//             minLength={3}
//             maxLength={50}
//           />
//           <button 
//             className="btn btn-primary" 
//             onClick={handleAdd}
//             disabled={!newCategory.trim()}
//           >
//             Add Category
//           </button>
//         </div>
//       </div>

//       <div className="list-group">
//         {categories.map(category => (
//           <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//               <h5 className="mb-1">{category.name}</h5>
//               {category.description && 
//                 <small className="text-muted">{category.description}</small>
//               }
//             </div>
//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => handleDelete(category.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
// import { toast } from 'react-toastify';

// export default function ManageCategories() {
//   const dispatch = useDispatch();
//   const { categories } = useSelector(state => state.categories);
//   const [newCategory, setNewCategory] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         credentials: 'include',
//       });
//       const data = await response.json();
//       dispatch(setCategories(data));
//     } catch (err) {
//       toast.error('Failed to load categories');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdd = async () => {
//     if (!newCategory.trim()) {
//       toast.error('Category name cannot be empty');
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: newCategory }),
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to create category');

//       const createdCategory = await response.json();
//       dispatch(addCategory(createdCategory));
//       setNewCategory('');
//       toast.success('Category created successfully');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
//         method: 'DELETE',
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to delete category');

//       dispatch(deleteCategory(id));
//       toast.success('Category deleted');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>Manage Categories</h2>
//       </div>
      
//       <div className="admin-card">
//         <div className="form-group">
//           <label className="form-label">Add New Category</label>
//           <div className="d-flex gap-2">
//             <input
//               type="text"
//               className="form-control"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               placeholder="Enter category name"
//               minLength={3}
//               maxLength={50}
//             />
//             <button 
//               className="btn btn-primary" 
//               onClick={handleAdd}
//               disabled={!newCategory.trim() || isLoading}
//             >
//               {isLoading ? 'Adding...' : 'Add'}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="admin-card">
//         <h3 className="mb-3">Existing Categories</h3>
//         {isLoading ? (
//           <div className="text-center py-4">Loading categories...</div>
//         ) : categories.length === 0 ? (
//           <div className="alert alert-info">No categories found</div>
//         ) : (
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map(category => (
//                 <tr key={category.id}>
//                   <td>
//                     <h5 className="m-0">{category.name}</h5>
//                     {category.description && 
//                       <small className="text-muted">{category.description}</small>
//                     }
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(category.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
// import { toast } from 'react-toastify';

// export default function ManageCategories() {
//   const dispatch = useDispatch();
//   const { categories } = useSelector(state => state.categories);
//   const [newCategory, setNewCategory] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const loadCategories = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         credentials: 'include',
//       });
//       const data = await response.json();
//       dispatch(setCategories(data));
//     } catch (err) {
//       toast.error('Failed to load categories');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     loadCategories();
//   }, [loadCategories]);

//   const handleAdd = async () => {
//     if (!newCategory.trim()) {
//       toast.error('Category name cannot be empty');
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:8000/api/categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: newCategory }),
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to create category');

//       const createdCategory = await response.json();
//       dispatch(addCategory(createdCategory));
//       setNewCategory('');
//       toast.success('Category created successfully');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
//         method: 'DELETE',
//         credentials: 'include'
//       });

//       if (!response.ok) throw new Error('Failed to delete category');

//       dispatch(deleteCategory(id));
//       toast.success('Category deleted');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="container my-4">
//       <div className="admin-header">
//         <h2>Manage Categories</h2>
//       </div>
      
//       <div className="card mb-4 shadow-sm">
//         <div className="card-body">
//           <div className="form-group">
//             <label className="form-label">Add New Category</label>
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 placeholder="Enter category name"
//                 minLength={3}
//                 maxLength={50}
//               />
//               <button 
//                 className="btn btn-primary" 
//                 onClick={handleAdd}
//                 disabled={!newCategory.trim() || isLoading}
//               >
//                 {isLoading ? 'Adding...' : 'Add Category'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h3 className="mb-3">Existing Categories</h3>
//           {isLoading ? (
//             <div className="text-center py-4">Loading categories...</div>
//           ) : categories.length === 0 ? (
//             <div className="alert alert-info">No categories found</div>
//           ) : (
//             <div className="list-group">
//               {categories.map(category => (
//                 <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div>
//                     <h5 className="mb-1">{category.name}</h5>
//                     {category.description && 
//                       <small className="text-muted">{category.description}</small>
//                     }
//                   </div>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(category.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
import { toast } from 'react-toastify';

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        credentials: 'include',
      });
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (err) {
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to create category');

      const createdCategory = await response.json();
      dispatch(addCategory(createdCategory));
      setNewCategory('');
      toast.success('Category created successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete category');

      dispatch(deleteCategory(id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="admin-header">
        <h2>Manage Categories</h2>
      </div>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Add New Category</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control py-2"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                minLength={3}
                maxLength={50}
                style={{ height: '38px' }}
              />
              <button 
                className="btn btn-primary py-2"
                onClick={handleAdd}
                disabled={!newCategory.trim() || isLoading}
                style={{ height: '38px', marginTop: 0 }}
              >
                {isLoading ? 'Adding...' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">Existing Categories</h3>
          {isLoading ? (
            <div className="text-center py-4">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="alert alert-info">No categories found</div>
          ) : (
            <div className="list-group">
              {categories.map(category => (
                <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{category.name}</h5>
                    {category.description && 
                      <small className="text-muted">{category.description}</small>
                    }
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}