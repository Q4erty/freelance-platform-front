import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, addCategory, deleteCategory } from '../../redux/categorySlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch('http://localhost:3001/categories');
      const data = await res.json();
      dispatch(setCategories(data));
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const res = await fetch('http://localhost:3001/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory })
      });
      const data = await res.json();
      dispatch(addCategory(data));
      setNewCategory('');
      toast.success('Category added');
    } catch (err) {
      toast.error('Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    
    try {
      await fetch(`http://localhost:3001/categories/${id}`, { method: 'DELETE' });
      dispatch(deleteCategory(id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error('Failed to delete category');
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
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Category
          </button>
        </div>
      </div>

      <div className="list-group">
        {categories.map(category => (
          <div key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(category.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}