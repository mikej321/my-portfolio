import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Glass from '../components/glass';
import FooterBar from '../components/footer';
import '../styles/App.css';
import '../styles/blogs.css';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [blogClickedId, setBlogClickedId] = useState(null);
  const [token, setToken] = useState(null);

  const scrollRef    = useRef(null);
  const blogsRef     = useRef(null);
  const viewportRef  = useRef(null);
  const blogClickRef = useRef(null);
  const navigate     = useNavigate();

  // fetch blogs once
  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const getBlogs = async () => {
    const response = await axios.get("/posts/get_blogs");
    return response.data.blogs;
  }

  // on mount: overlay scrollbars + grid entrance tweens
  useEffect(() => {
    const osInstance = OverlayScrollbars(scrollRef.current, {});
    const viewportEl = osInstance.elements().viewport;
    viewportRef.current = viewportEl;
    
    setToken(localStorage.getItem('token'));

    const blogChildren = [...blogsRef.current.children];
    blogChildren.forEach(child => {
      gsap.fromTo(
        child,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: child,
            scroller: viewportEl,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
    return () => {
      osInstance.destroy();
    };
  }, []);

  // when a blog is selected, animate its content in
  useEffect(() => {
    if (blogClickedId === null) return;
    requestAnimationFrame(() => {
      const clickedBlog = [...blogClickRef.current.children];
      clickedBlog.forEach(child => {
        gsap.fromTo(
          child,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.3, ease: "power3.out" }
        );
      });
    });
  }, [blogClickedId]);

  // handler: animate grid out, then set selected
  const handleBlogClick = id => {
    const gridCards = [...blogsRef.current.children];
    gsap.to(gridCards, {
      x: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "power1.in",
      onComplete: () => setBlogClickedId(id)
    });
  };

  // handler: animate expanded out, then clear selection
  const handleBackClick = () => {
    if (!blogClickRef.current) return;
    const expandedCards = [...blogClickRef.current.children];
    gsap.to(expandedCards, {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      ease: "power1.in",
      onComplete: () => setBlogClickedId(null)
    });
  };

  const handleHomeClick = () => {
    if (blogClickedId == null) {
        const blogChildren = [...blogsRef.current.children];

        gsap.to(blogChildren, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
            stagger: 0.2,
            onComplete: () => {
                navigate('/')
            }
        })
    } else {
        const singleBlogChildren = [...blogClickRef.current.children];

        gsap.to(singleBlogChildren, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
            stagger: 0.2,
            onComplete: () => {
                navigate('/');
            }
        })
    }
  }

  const blogDelete = async(blogId) => {

    const token = localStorage.getItem("token");

    if (!token) return console.error("No token found");

    await axios.delete(`/posts/${blogId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setBlogs(bs => bs.filter(b => b.articleId !== blogId));
  }

  const selected = blogs.find(b => b.articleId === blogClickedId);

  return (
    <div className="page_container">
      <header>
        <Navbar />
      </header>
      <main>
        <Glass className="glass_blogs">
          <div className="breadcrumb_container">
            <p className="former_page" onClick={handleHomeClick}>
              Home <span className="separator">&gt;</span>
            </p>
            <p
              className={`${blogClickedId == null ? "current_page" : "former_page"}`}
              onClick={handleBackClick}
            >
              My Blogs
            </p>
            {blogClickedId !== null && (
              <p className="current_page">
                <span className="separator">&gt;</span> {selected?.title}
              </p>
            )}
          </div>
          <div ref={scrollRef} className="scrollbar-container blog-scroller">
            {blogClickedId === null ? (
                // Means nothing is clicked
              <div ref={blogsRef} className="blogs_grid">
                {blogs.length > 0 ? 
                  blogs.map(blog => (
                    <div
                      className="blog_container"
                      key={blog.articleId}
                      onClick={() => handleBlogClick(blog.articleId)}
                    >
                      <h2>{blog.title}</h2>
                      {token && (
                        <FontAwesomeIcon onClick={(e) => {
                          e.stopPropagation();
                          blogDelete(blog.articleId);
                        }} className="delete_icon" icon={faXmark} size="2x" />
                      )}
                    </div>
                  )) : (
                    <div className="blog_container">No Blogs Currently Available</div>
                  )
                }
              </div>
            ) : (
                // A blog is clicked
              <div ref={blogClickRef} className="blog_clicked_expanded">
                <React.Fragment key={selected.articleId}>
                  <h2>{selected.title}</h2>
                  <p>{selected.content}</p>
                </React.Fragment>
              </div>
            )}
          </div>
        </Glass>
      </main>
    </div>
  );
}
