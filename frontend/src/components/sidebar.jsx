import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';
import '../styles/sidebar.css';

export default function Sidebar({ isOpen }) {

    const navigate = useNavigate();

    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);
    const sidebarTl = useRef(null);

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = (location) => {
        if (loggedIn) {
            localStorage.removeItem('token');
            navigate(location);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [loggedIn])

    useLayoutEffect(() => {
        const links = [...hamburgerRef.current.children];

        sidebarTl.current = gsap.timeline({ paused: true })
            .to(sidebarRef.current, {
                maxWidth: '20rem',
                duration: 1,
                ease: "power3.out"
            })
            .fromTo(
                links, {
                    x: -50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            )

        return () => sidebarTl?.current?.kill();

    }, [loggedIn])

    useEffect(() => {
        if (!sidebarTl.current) return;

        isOpen ? sidebarTl.current.play() : sidebarTl.current.reverse();
    }, [isOpen])

    return (
        <div ref={sidebarRef} className="sidebar_container">
            <ul ref={hamburgerRef} className="hamburger_links">
                {!loggedIn ? (
                    <li onClick={() => navigate('/login')}>Login</li>

                ) : (
                    <>
                        <li onClick={() => navigate('/posts')}>Create Post</li>
                        <li onClick={() => handleLogout('/login')}>Logout</li>
                    </>
                )}
            </ul>
        </div>
    )
}