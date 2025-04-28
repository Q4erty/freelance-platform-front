import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder, setOrders } from '../../redux/dataSlice';
import { setCategories } from '../../redux/categorySlice';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersRes = await fetch('http://localhost:3001/orders');
        const ordersData = await ordersRes.json();
        dispatch(setOrders(ordersData));

        const categoriesRes = await fetch('http://localhost:3001/categories');
        const categoriesData = await categoriesRes.json();
        dispatch(setCategories(categoriesData));
      } catch (err) {
        console.error('Loading error:', err);
      }
    };
    loadData();
  }, [dispatch]);

  const creatorId = user?.id;
  const allOrders = useSelector((state) => state.data.orders);
  console.log(allOrders);
  const creatorOrders = allOrders.filter(order => 
    order.clientId === creatorId && 
    order.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? order.categoryId === selectedCategory : true)
  );
  console.log(creatorOrders);

  const filteredOrders = creatorOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? order.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteOrder(orderId));
      }
    } catch (error) {
      console.log('MyOrders.jsx errored deleting order');
    }
  };

  return (
    <div className='container my-4'>
      <div className="mb-4">
        <div className="row g-3">
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
      </div>
      <h2 className='mb-4'>My Orders</h2>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {filteredOrders.map((order) => (
          <div key={order.id} className='col'>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title'>{order.title}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>
                  Category: {categories.find(c => c.id === order.categoryId)?.name || 'Unknown'}
                </h6>
                <span className={`badge ${order.freelancerId ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {order.freelancerId ? 'In Progress' : 'Waiting Freelancer'}
                </span>
                <p className='card-text mt-2'>{order.description}</p>
              </div>
              <div className='card-footer d-flex justify-content-between'>
                <span className='fw-bold'>{order.price} KZT</span>
                <small className='text-muted'>Deadline: {order.deadline}</small>
              </div>
              {!order.freelancerId && (
                <div className='card-footer d-flex p-0'>
                  <Link
                    to={`/client/edit-order/${order.id}`}
                    className='btn btn-outline-primary w-50 rounded-0 border-end'>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(order.id)} className='btn btn-outline-danger w-50 rounded-0'>
                    Delete
                  </button>
                </div>
              )}
              {order.freelancerId && (
                <div className='card-footer d-flex p-0'>
                  <button 
                    className='btn btn-outline-info w-100 rounded-0'
                    disabled
                  >
                    Open Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}