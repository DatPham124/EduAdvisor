import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {useLocation} from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', data);
  };

  return (
    <main className="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]" 
      >
        <div className='container tilte mb-2'>
          <div className='flex flex-col items-center justify-center'>
            <p className='!text-4xl font-bold text-white uppercase'>đại học ninh kiều</p>
            <div className='logo mt-1'>
              <img src='/images/logo.png' alt='logo' className='w-12 h-12' />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-box w-xs mx-auto p-6 shadow-md mb-10">
            <fieldset className="fieldset w-full">
              
              <label className="floating-label">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-lg !text-black border-gray-600"
                  value={data.email}
                  onChange ={handleChange}
                  name="email"
                  required
                />
                <span className=''>Email</span>
              </label>
              <label className="floating-label mt-4">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="input input-lg !text-black !border-gray-600"
                  value={data.password}
                  onChange={handleChange}
                  name="password"
                  required
                />
                <span className=''>Mật khẩu</span>
              </label>
              <button
                type="submit"
                className="btn bg-primary btn-lg w-full mt-4 text-white text-lg shadow-md hover:bg-neutral-50 hover:text-primary!"
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </fieldset>
            <div className="flex flex-col items-center justify-center mt-8 mb-3">
              <Link
                to="/signup"
                className="text-gray-500 !text-xs !hover:text-primary transition duration-200"
              >
                Chưa có tài khoản? Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
