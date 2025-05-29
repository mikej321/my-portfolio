import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/App.css";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from '../components/footer';

export default function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/adminSignup", {
                username,
                password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
            console.log("Signup response", { usename: response.username, password: response.password });
            navigate("/login");
        } catch(err) {
            console.error("Signup failed:", err.response?.data || err.message);
        }
    }

    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
                <Glass className="glass_login">
                    <h1 className="login_header">Admin Signup</h1>
                    <form className="login_inputs" onSubmit={handleSignup}>
                        <div className="username_login">
                            <label htmlFor="username" className="username">Username</label>
                            <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="password_login">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}