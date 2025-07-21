import React from "react";

const BlogDetails = ({ blogData, blogId }) => {
  // Find blog by ID
  const blog = blogData.find((item) => item.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-6">
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>

        <div className="text-sm text-gray-500 mb-4">
          By <span className="font-semibold">{blog.authorName}</span> •{" "}
          {new Date(blog.date).toLocaleDateString()}
        </div>

        <p className="text-gray-700 leading-relaxed">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
