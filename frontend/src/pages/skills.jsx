import { useState } from "react";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import FooterBar from "../components/footer";
import Icon_bar from "../components/icon_bar";
import '../styles/App.css';
import '../styles/skills.css';

export default function Skills() {
    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
                <Glass className="glass_skills">
                    <div className="breadcrumb_container">
                        <p>Home &gt; <span className="current_page">My Skills</span></p>
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
                        
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}