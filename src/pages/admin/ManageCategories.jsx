// src/pages/admin/ManageCategories.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
import { toast } from 'react-toastify';

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const { token } = useSelector(state => state.auth);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        credentials: 'include',
      });
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

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
      <h2>Manage Categories</h2>
      
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            minLength={3}
            maxLength={50}
          />
          <button 
            className="btn btn-primary" 
            onClick={handleAdd}
            disabled={!newCategory.trim()}
          >
            Add Category
          </button>
        </div>
      </div>

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
    </div>
  );
}