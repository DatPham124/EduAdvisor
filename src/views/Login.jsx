import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {useLocation} from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login formData:', formData);
  };

  return (
    <main className="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container tilte mb-5">
          <div className="flex flex-col items-center justify-center">
            <p className="!text-4xl font-bold text-white uppercase">
              đại học ninh kiều
            </p>
          </div>
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center bg-neutral-100 rounded-box w-xs mx-auto p-6 shadow-md mb-10 !z-10">
            <fieldset className="fieldset w-full">
              <label className="input input-md input-primary validator shadow-md">
                <svg
                  className="h-[1em] text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  className="!text-gray-400"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
              <label className="input input-md validator shadow-md mt-4">
                <svg
                  className="h-[1em] text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  className='!text-gray-400'
                  required
                  placeholder="Mật khẩu"
                  minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
              <button
                type="submit"
                className="btn bg-primary btn-md w-full mt-4 text-white text-md shadow-lg"
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </fieldset>
            <div className="flex flex-col items-center justify-center mt-5 mb-3">
              <Link
                to="/signup"
                className="link link-primary !link-hover text-xs italic"
              >
                Chưa có tài khoản? Đăng ký ngay
              </Link>
            </div>
            <div className="logo mt-3">
              <img
                src="/images/logo_name.png"
                alt="Logo"
                className="h-10"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-96 z-0">
            <img src="/images/dots.svg" alt="Dot" className=" w-25 opacity-75" />
          </div>
          <div className='absolute top-50 right-96 z-0'>
              <img src='/images/dots.svg' alt="Dot" className="w-25 opacity-75" />
          </div>
      </div>
    </main>
  );
};

export default Login;
