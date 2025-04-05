import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from '../redux/authSlice'; 
import { useNavigate } from "react-router-dom";
import usersData from '../free.json';

 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersData.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      dispatch(login(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
