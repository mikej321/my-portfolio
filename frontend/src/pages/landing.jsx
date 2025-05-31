import { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import '../styles/App.css';
import "../styles/landing.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import Icon_bar from "../components/icon_bar";
import Sidebar from "../components/sidebar";

export default function Landing() {

    const navigate = useNavigate();

    const glassRef = useRef(null);
    const picRef = useRef(null);
    const headerRef = useRef(null);
    const roleDetails = useRef(null);

    const landingTl = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleIconClick = (targetRoute) => {
        navigate(targetRoute);
    }

    return (
        <div className="page_container">
            <header>
                <Navbar onIconClick={openSidebar} />
            </header>
            <main>
                <Sidebar isOpen={sidebarOpen} />
                <Glass ref={glassRef} className="glass_container glass_landing">
                    <div ref={picRef} className="profile_pic_container">
                        <img className="profile_pic" src="/assets/profile_pic.jpg" alt="author's profile pic" />
                    </div>
                    <h1 className="landing_header">Michael Johnson</h1>
                    <div className="role_details">
                        <p className="role">Data & Software Engineer</p>
                        <p className="landing_guide">View my work below and let's create something truly special</p>
                    </div>
                    <Icon_bar onIconClick={handleIconClick} />
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}