import React, { useState } from "react";

const BlogHome = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [blogs, setBlogs] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields.");
      return;
    }

    const newBlog = {
      title: formData.title,
      description: formData.description,
      imageURL: URL.createObjectURL(formData.image),
    };

    setBlogs([newBlog, ...blogs]);

    // Clear form
    setFormData({
      title: "",
      description: "",
      image: null,
    });
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
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Blog Description</label>
              <textarea
                name="description"
                value={formData.description}
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
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Submitted Blogs</h2>
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blogs submitted yet.</p>
            ) : (
              blogs.map((blog, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border p-3 rounded-lg"
                >
                  <img
                    src={blog.imageURL}
                    alt="Blog Thumbnail"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{blog.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
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
