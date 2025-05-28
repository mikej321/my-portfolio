import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import '../styles/App.css';
import '../styles/contact.css';

gsap.registerPlugin(useGSAP);

export default function Contact() {

    const navigate = useNavigate();
    const tl = useRef();
    const glassRef = useRef();

    useGSAP(() => {

        const mediaQuery = gsap.matchMedia();

        mediaQuery.add("(min-width: 40rem)", () => {
        tl.current = gsap.timeline()
          .fromTo('.phone_container', { opacity: 0, x: -50 }, { opacity: 1, x: 0, delay: 1.5, duration: .2, ease: "power3.out" })
          .fromTo('.email_container', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: .2, ease: "power3.out" })
          .fromTo('.mission_statement', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: .2, ease: "power3.out" });
    });

    mediaQuery.add("all", () => {
        tl.current = gsap.timeline({ paused: true })
          .fromTo('.phone_container', { opacity: 0, x: -50 }, { opacity: 1, x: 0, delay: 1.5, duration: .2, ease: "power3.out" })
          .fromTo('.email_container', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: .2, ease: "power3.out" })
          .fromTo('.mission_statement', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: .2, ease: "power3.out" });
    }); 

    requestAnimationFrame(() => tl.current?.play());

    return () => {
        mediaQuery.revert()
    }

    }, { scope: glassRef })

    const handleLeave = () => {
        tl.current?.reverse().then(() => {
            navigate("/landing");
        })
    }

    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
                <Glass ref={glassRef} className="glass_contact">
                    <div className="breadcrumb_container">
                        <p className="former_page" onClick={handleLeave}>Home &gt; <span className="current_page">Contact Me</span></p>
                    </div>
                    <div className="contact_info_container">
                        <div className="info_container phone_container">
                            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.16556 21.342C2.78591 16.1336 5.26596 11.1515 9.0838 7.44405C11.2098 5.37948 13.7429 3.71778 16.4967 2.54645C20.1133 1.00807 25.6673 2.93184 28.4695 5.65304L40.356 17.1959C41.7922 18.5905 42.6763 20.4321 42.8528 22.397C43.0294 24.3619 42.4872 26.3243 41.3214 27.9395L36.071 35.2141C34.0978 37.948 33.3974 42.7376 34.9118 45.7328C37.6416 51.1318 41.3292 56.0749 45.7763 60.2621C51.6761 65.8169 58.9063 70.029 66.725 72.4826C67.7081 72.7911 69.1072 72.4355 69.8378 71.726L77.5676 64.2197C78.7253 63.0955 80.2955 62.4639 81.9328 62.4639C83.5701 62.4639 85.1403 63.0955 86.298 64.2197L100.207 77.7269C101.321 78.8086 101.963 80.2657 101.998 81.795C102.034 83.3243 101.461 84.8081 100.399 85.9377L88.0793 99.0365C86.4993 100.716 83.331 101.862 81.0235 101.469C73.8219 100.245 66.783 98.1183 60.1392 95.1545C45.0555 88.4256 32.2487 77.4969 21.7706 64.9951C14.9962 56.9123 9.07623 48.0594 5.18631 38.3465C3.0177 32.9317 1.47814 27.1135 2.16556 21.342Z" stroke="#E2E8F0" strokeWidth="3" />
                            </svg>

                            <p className="phone_number">843-833-4379</p>
                        </div>
                        <div className="info_container email_container">
                            <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M30.6 3.81836L17 15.53L3.4 3.80168V3.33333H30.6V3.81836ZM3.4 21.6667V8.24168L17 19.9666L30.6 8.255V21.6667H3.4ZM0 25H34V0H0V25Z" fill="#E2E8F0" />
                            </svg>

                            <p className="email_address">mjohnsondevelops@gmail.com</p>
                        </div>
                    </div>
                    <div className="mission_statement">
                        Engineer. Problem-solver. Collaborator. For me, coding
                        is more than just a career or hobby, it's my passion.
                        I'm all about building things that work well for you and your clients.
                        Let's work side by side together to build something truly great.
                    </div>
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}