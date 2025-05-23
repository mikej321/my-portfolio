import { useState } from "react";
import "../styles/App.css";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";

function Login() {
  return (
    <div className="page_container">
      <header>
        <Navbar />
      </header>
      <main>
        <Glass className="glass_container glass_login">
          <h1 className="login_header">Admin Login</h1>
          <div className="login_inputs">
            <div className="username_login">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
            </div>
            <div className="password_login">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Login</button>
          </div>
        </Glass>
        <FooterBar />
      </main>
    </div>
  );
}

export default Login;
