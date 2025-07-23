import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router'

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [realTime, setRealTime] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogDescription: '',
    image: null,
  });
  // fetch all blogs
  useEffect(() => {
    const allBlog = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getAllBlog');
        if (response?.data?.blog) {
          setBlogs(response?.data?.blog);
        } else {
          console.log('blog not found');
        }

        console.log(response?.data?.blog);
      } catch (error) {
        console.log('error fetching all blogs data', error);
      }
    };
    allBlog();
  }, [realTime]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { blogTitle, blogDescription, image } = formData;
      const fromInput = new FormData();
      fromInput.append('blogTitle', blogTitle);
      fromInput.append('blogDescription', blogDescription);
      fromInput.append('image', image);
      const response = await axios.post(
        'http://localhost:4000/createBlog',
        fromInput
      );
      console.log(response);
    } catch (error) {
      console.log('Error Submitted Blog', error);
    } finally {
      setRealTime(!realTime);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Create Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Blog Title</label>
              <input
                type="text"
                name="blogTitle"
                value={formData.blogTitle}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">
                Blog Description
              </label>
              <textarea
                name="blogDescription"
                value={formData.blogDescription}
                onChange={handleChange}
                rows="3"
                placeholder="Enter description"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Blog Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Blog
            </button>
          </form>
        </div>

        {/* Right: Blog List */}
        <div className="w-1/3  bg-white p-6 rounded-2xl shadow overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Submitted Blogs
          </h2>
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blogs submitted yet.</p>
            ) : (
              blogs
                .slice()
                .reverse()
                .map((blog, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border p-3 rounded-lg"
                  >
                    <img
                      src={blog?.image}
                      alt="Blog Thumbnail"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className=" font-bold text-xl">{blog.blogTitle}</h4>
                      <p className=" text-gray-600 line-clamp-2 font-bold text-sm">
                        {blog?.blogDescription}
                      </p>
                    </div>

                  <Link to={`/blogpost/${blog.slug}`}>
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-black hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      view
                    </button>
                  </Link>
                
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
