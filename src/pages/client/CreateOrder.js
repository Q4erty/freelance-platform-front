function CreateOrder() {
    return (
      <div className="page">
        <h2>Create New Order</h2>
        <form className="order-form">
          <input type="text" placeholder="Project Title" required />
          <textarea placeholder="Project Description" required></textarea>
          <select>
            <option>Select Freelancer</option>
            <option>Freelancer A</option>
            <option>Freelancer B</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
  
  export default CreateOrder;
  