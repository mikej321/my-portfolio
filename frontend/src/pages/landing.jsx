import { useState } from "react";
import '../styles/App.css';
import "../styles/landing.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import Icon_bar from "../components/icon_bar";

export default function Landing() {
    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
                <Glass className="glass_container glass_landing">
                    <div className="profile_pic_container">
                        <img className="profile_pic" src="/assets/profile_pic.jpg" alt="author's profile pic" />
                    </div>
                    <h1 className="landing_header">Michael Johnson</h1>
                    <div className="role_details">
                        <p className="role">Data & Software Engineer</p>
                        <p className="landing_guide">View my work below and let's create something truly special</p>
                    </div>
                    <Icon_bar />
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}