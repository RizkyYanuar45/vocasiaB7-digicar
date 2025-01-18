import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blog/${slug}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  const imageUrl = `http://localhost:5000/${blog.thumbnail}`;

  return (
    <>
      <Navbar isBgWhite={false} />
      <Container>
        <div className="py-28">
          <NavLink
            to="/blog"
            className="text-white-50 bg-night-shadz-700 rounded px-8 py-3"
          >
            &larr; Kembali
          </NavLink>
          <h1 className="text-black-950 text-3xl lg:text-5xl my-14">
            {blog.title}
          </h1>
          <div className="relative w-full h-[300px] lg:h-[550px] mb-14">
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetail;
