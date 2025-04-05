import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setOrders } from "../../redux/dataSlice";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = { title, description, price, category, deadline, clientId: user.id, freelancerId: null };

    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((order) => {
        dispatch(setOrders([order]));
        alert("Order created successfully!");
      })
  };

  return (
    <div className="page">
      <h2>Create New Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <input type="text" id="title" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea id="description" placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="number" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" id="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
