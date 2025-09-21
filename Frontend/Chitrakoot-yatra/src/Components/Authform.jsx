import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from "react-hot-toast";



function AuthForm() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });



  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let res;
    if (isLogin) {
      res = await axios.post('https://chitrakoot-yatra.onrender.com/api/login', {
        email: formData.email,
        password: formData.password,
      },{
         credentials: true,
      }
    );
      toast.success("Login successfully 🙏", { autoClose: 2000});
      navigate('/')
      
    } else {
      res = await axios.post('https://chitrakoot-yatra.onrender.com/api/signin', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },{
         credentials: true,
      });
      toast.success("welcome sir in our web")
      navigate('/')
    }

    // Save the user data returned from backend in localStorage
    
    localStorage.setItem('user', JSON.stringify(res.data.data));
    window.dispatchEvent(new Event("res.data.data"));

    

  } catch (error) {
  const errorMessage = error.response?.data?.message || "Something went wrong";
  toast.error(errorMessage, { duration: 3000 });
  }

  setFormData({ name: '', email: '', password: '' });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DBC2A6] p-4">
      <div className="max-w-md w-full bg-[#414A37] mt-[12vh] rounded shadow p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 font-semibold rounded-l ${
              isLogin ? 'bg-green-900 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r ${
              !isLogin ? 'bg-green-900 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#556B2F] text-white py-2 rounded hover:bg-[#344F1F] transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Optional Link */}
        <p className="mt-4 text-center text-sm text-white">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-yellow-100 underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' }); // Reset form
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
