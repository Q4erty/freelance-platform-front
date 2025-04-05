import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration successful (mock)");
    navigate("/login");
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
