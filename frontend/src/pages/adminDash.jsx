import { useRef, useState } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Glass from "../components/glass";
import Icon_bar from "../components/icon_bar";
import '../styles/App.css';
import '../styles/adminDash.css';
import FooterBar from "../components/footer";

export default function AdminDash() {
    const navigate = useNavigate();

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');

    const submitBlog = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "http://localhost:3000/posts/add_blog",
                {
                    title: blogTitle,
                    content: blogContent
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            navigate('/');
        } catch(err) {
            if (err.response) {
                console.error("Validation failed:", err.response.data.errors);
                console.error(
                    err.response.data.errors.map(e => `${e.param}: ${e.msg}`).join("\n"));
            } else if (err.request) {
                console.error("No response from server");
            }
        }
    }
    
    return (
        <div className="page_container">
            <header>
                <Navbar />
            </header>
            <main>
                <Glass className="glass_dash">
                    <div className="breadcrumb_container">
                        <p className="former_page" onClick={() => navigate('/')}>Home &gt; <span className="current_page">Admin Dashboard</span></p>
                    </div>
                    <form className="blog_inputs" onSubmit={submitBlog}>
                        <div className="title_container">
                            <label htmlFor="title" className="title">Blog Title</label>
                            <input type="text" name="title" id="title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                        </div>
                        <div className="content_container">
                            <label htmlFor="content" className="content">Blog Content</label>
                            <textarea type="text" name="content" id="content" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
                        </div>
                        <button className="add_blog" type="submit">Add Blog</button>
                    </form>
                </Glass>
                <FooterBar />
            </main>
        </div>
    )
}