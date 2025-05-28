import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import '../styles/App.css';
import "../styles/landing.css";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import Icon_bar from "../components/icon_bar";

export default function Landing() {

    const navigate = useNavigate();

    const glassRef = useRef(null);
    const picRef = useRef(null);
    const headerRef = useRef(null);
    const roleDetails = useRef(null);

    const handleIconClick = (targetRoute) => {
        const landingExitTl = gsap.timeline();
        const roleChildren = [...roleDetails.current.children];

        landingExitTl.to(picRef.current, {
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

    
    useGSAP(() => {
        
        const landingTl = gsap.timeline();
        const roleChildren = [...roleDetails.current.children];

        landingTl.fromTo(picRef.current, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            delay: .5,
            duration: .3,
            ease: "power3.out"
        })
        .fromTo(headerRef.current, {
            x: 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: .3,
            ease: "power3.out"
        })
        .fromTo(roleChildren, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: .3,
            ease: "power3.out"
        })

    }, { scope: glassRef })

    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
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