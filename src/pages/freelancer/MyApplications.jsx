import { useSelector } from "react-redux";

export default function MyApplications() {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.data.orders);
  const applications = orders.filter((order) => order.freelancerId === user.id);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Applications</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {applications.map((order) => (
          <div key={order.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{order.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Category: {order.category}</h6>
                <p className="card-text mt-2">{order.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="fw-bold text-success">{order.price} KZT</span>
                <small className="text-muted">Deadline: {new Date(order.deadline).toLocaleDateString()}</small>
              </div>
              <div className="card-body">
                <button className="btn btn-danger w-100 mt-3">Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
