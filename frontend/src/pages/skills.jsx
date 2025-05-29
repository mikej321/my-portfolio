import { useRef } from "react";
import { OverlayScrollbars } from 'overlayscrollbars';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import Icon_bar from "../components/icon_bar";
import '../styles/App.css';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const containers = [
      ".tools_container",
      ".strengths_container",
      ".achievements_container"
    ];

  const sampleData = [
    { name: "HTML", value: 500},
    { name: "CSS", value: 500 },
    { name: "JS", value: 400 },
    { name: "Python", value: 300 },
    { name: "SQL", value: 240 },
    { name: "Design", value: 278 },
  ]

  const animateStaggeredChildren = (containerSelector, scrollerEl) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const children = Array.from(container.children).flatMap(child =>
      child.tagName === 'UL' ? Array.from(child.children) : [child]
    );

    gsap.fromTo(children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: 2.5,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: container,
          scroller: scrollerEl,
          start: "top+=100 bottom",
          toggleActions: "play reverse play reverse",
        },
        ease: "power3.out"
      }
    );
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const osInstance = OverlayScrollbars(containerRef.current, {
      scrollbars: { autoHide: 'leave' }
    });

    const scrollerEl = osInstance.elements().viewport;
    viewportRef.current = scrollerEl;

    containers.forEach(selector => {
      animateStaggeredChildren(selector, scrollerEl);
    });

    ScrollTrigger.refresh();

    return () => {
      osInstance?.destroy();
    };
  }, []);

  const backAnimation = async() => {
    gsap.to(".tools_container, .strengths_container, .achievements_container", {
      y: -50,
      opacity: 0,
      stagger: 0.2,
      onComplete: () => {
        navigate('/');
      }
    })
  }

  return (
    <div className="page_container">
      <header>
        <Navbar />
      </header>
      <main>
        <Glass className="glass_skills">
          <div ref={containerRef} className="scrollbar-container">
            <div className="skills_grid">
              <div className="breadcrumb_container">
                <p className="former_page" onClick={backAnimation}>Home &gt; <span className="current_page">My Skills</span></p>
              </div>

              <div className="tools_container">
                <h1>Tools and Tech</h1>
                <ul className="tools">
                  <li>HTML5/CSS3</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Python</li>
                  <li>SQL (PostgreSQL)</li>
                </ul>
              </div>

              <div className="strengths_container">
                <h1>Strengths</h1>
                <ul className="strengths">
                  <li>UI Design</li>
                  <li>Data Analysis</li>
                  <li>Full Stack Development</li>
                  <li>Responsive Design</li>
                  <li>Clean Code</li>
                </ul>
              </div>

              <div className="achievements_container">
                <h1>Achievements</h1>
                <ul className="achievements">
                  <li>Finished FreeCodeCamp's Web Development Course (2022)</li>
                  <li>Finished TheOdinProject's Full Stack Course (2023)</li>
                  <li>Obtained Associate Data Engineer certification with DataCamp (April 3, 2025)</li>
                  <li>Completed Build Carolina Apprenticeship (June 20, 2025)</li>
                </ul>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                   data={sampleData} 
                  //  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                   className="my-bar-chart"
                   >
                    <CartesianGrid strokeDasharray="3 3" className="grid-lines" />
                    <XAxis dataKey="name" className="x-axis" />
                    <YAxis className="y-axis" />
                    <Tooltip wrapperClassName="tooltip-box" />
                    <Bar dataKey="value" animationDuration={800} activeBarOffset={0} className="my-bar" />
                   </BarChart>
                </ResponsiveContainer>

              </div>
            </div>
          </div>
        </Glass>
        <FooterBar />
      </main>
    </div>
  );
}
