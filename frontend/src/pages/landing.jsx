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
        const roleChildren = [...roleDetails.current.children];

        landingTl.current.to(picRef.current, {
            x: -50,
            opacity: 0,
            duration: .3,
            ease: "power3.in"
        })
        .to(headerRef.current, {
            x: 50,
            opacity: 0,
            duration: .3,
            ease: "power3.in"
        })
        .to(roleChildren, {
            x: -50,
            opacity: 0,
            duration: .3,
            ease: "power3.in",
            stagger: 0.2,
            onComplete: () => navigate(targetRoute)
        })
    }

    useLayoutEffect(() => {
        const roleChildren = [...roleDetails.current.children];

        gsap.set(
            [picRef.current, headerRef.current, roleChildren],
            { x: -50, opacity: 0 }
        )

        landingTl.current = gsap.timeline()
            .to(picRef.current, {
                x: 0,
                opacity: 1,
                duration: .3,
                ease: "power3.out"
            })
            .to(headerRef.current, {
                x: 0,
                opacity: 1,
                duration: .3,
                ease: "power3.out"
            })
            .to(roleChildren, {
                x: 0,
                opacity: 1,
                duration: .3,
                ease: "power3.out",
                stagger: 0.2,
            });

        landingTl.current.play();
    }, [])

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
                    <h1 ref={headerRef} className="landing_header">Michael Johnson</h1>
                    <div ref={roleDetails} className="role_details">
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