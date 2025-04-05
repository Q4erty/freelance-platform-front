import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Welcome, {user.name}!</p>
      <p>Your role: <strong>{user.role}</strong></p>
    </div>
  );
}

export default Dashboard;
