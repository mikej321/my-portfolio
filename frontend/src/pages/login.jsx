import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/adminLogin", {
      username,
      password
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    });

    localStorage.setItem("token", response.data.token);

    navigate("/landing");
  };

  return (
    <div className="page_container">
      <header>
        <Navbar />
      </header>
      <main>
        <Glass className="glass_container glass_login">
          <h1 className="login_header">Admin Login</h1>
          <form className="login_inputs" onSubmit={handleLogin}>
            <div className="username_login">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="password_login">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </Glass>
        <FooterBar />
      </main>
    </div>
  );
}
