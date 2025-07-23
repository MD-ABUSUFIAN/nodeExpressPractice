import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const BlogDetails = () => {
  const [blog, setBlog] = useState([]);
  const navigate=useNavigate()
    const[editMode,setEditMode]=useState(false)
    const [preivew,setPreview]=useState('')
      const [formData, setFormData] = useState({
        blogTitle: blog.blogTitle,
        blogDescription: 'blog.blogDescription',
        image: preivew,
      });
  const { slug } = useParams();
  
  useEffect(() => {
    const singleBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/singleBlog/${slug}`
        );
        setBlog(response.data.data);
      } catch (error) {
        console.log('error feteching single blog data', error);
      }
    };

    singleBlog();
  }, []);
const handleChange=(e)=>{  
      const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  setPreview(url)


}
 
const handleSave=async()=>{
 
try {

    const { blogTitle, blogDescription, image } = formData;
      const editInput= new FormData()
      editInput.append('blogTitle', blogTitle);
      editInput.append('blogDescription', blogDescription);
      editInput.append('image', image);
    //  update api 

    
    const response=await axios.put(`http://localhost:4000/updateBlog/${slug}`,formData)
    if(response.status=="200"){
navigate(window.history.back())
    }
   
  
} catch (error) {
  console.log("error from edit save function",error)
} 
}
// handle delete 
const handleDelete=async(slug)=>{
 try {
  const response=await axios.delete(`http://localhost:4000/deleteBlog/${slug}`)  
  if(response.status=="200"){
    alert("blog delete successfully")
    navigate(window.history.back())
  }
  
 } catch (error) {
  console.log("error from delete function",error)
 }

}
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-6">
           <div className='my-3'>
          {
            editMode ? (<div><label className="block mb-1 text-gray-600 font-bold">Blog Title</label><input   onChange={handleChange} className='outline w-full text-xl p-2 rounded' type='text' name="blogTitle" defaultValue={blog.blogTitle} placeholder='plz update Blog Title'/></div>):(<h1 className="text-3xl font-bold  text-gray-800 mb-2">
          {blog.blogTitle}
        </h1>)
          }
        </div>
        {
          preivew && <img className='w-full' src={preivew}/>
        }

        {
          editMode? (      <div>
              <label className="block mb-1 text-gray-600">Blog Image</label>
              <input
                type="file"
                onChange={handleChange}
                name="image"
                accept="image/*"
                // onChange={handleChange}
                className="w-full border p-2"
                required
              />
            </div>):( <img
          src={blog.image}
          alt={blog.blogTitle}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />)
        }
       

     

        <div className="text-sm text-gray-500 mb-4">
          By <span className="font-semibold">{blog.authorName}</span> •{' '}
          {new Date().toLocaleDateString()}
        </div>

        {
          editMode ? ( <div>
              <label className="block mb-1 text-gray-600">
                Blog Description
              </label>
              <textarea
                name="blogDescription"
                defaultValue={blog.blogDescription}
                onChange={handleChange}
                rows="3"
                placeholder="Enter description"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>):( <p className="text-gray-700 leading-relaxed">{blog.blogDescription}</p>)
        }

       
        <div>
          <Link to={`/blogpost/${blog.slug}`}>
          {
             editMode?( <button 
            onClick={handleSave}
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
            save
            </button>):( <button 
            onClick={()=>setEditMode(!editMode)}
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
            edit
            </button>)
          }
           
          </Link>
          <button
            type="button"
             onClick={()=>handleDelete(blog?.slug)}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Delete
          </button>
          <button
            type="button"
            onClick={()=>window.history.back()}
            class="focus:outline-none text-white bg-gray-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Go-Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
