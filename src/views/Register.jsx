import React, { useState } from 'react';

import userService from '../services/register.service';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    province: '',
    district: '',
    school: '',
    favorite: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleReset = () => {
  //   setFormData({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     password: '',
  //     province: '',
  //     district: '',
  //     school: '',
  //     hobby: '',
  //   });
  // };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Kiểm tra dữ liệu hợp lệ
  const isFormValid =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.favorite.trim() !== '';

  if (!isFormValid) {
    alert('Hãy điền đầy đủ thông tin để được tư vấn');
    return;
  }

  try {
     const registerAd = await userService.register(formData);
     navigate('/chatbot', { state: { registerAd } });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
  }
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
          <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-box w-2xl mx-auto p-6 shadow-md mb-10">
            <fieldset className="fieldset w-full">
                 <div className="flex items-center justify-center logo mt-3">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-14"
              />
            </div>
              <p className="!text-2xl font-bold text-primary uppercase flex items-center justify-center mb-3">
              đăng ký để được tư vấn
            </p>
              <div className="flex flex-row items-center mb-4 mt-2">
                <label className="label !text-gray-500 ml-3 flex flex-1/7">
                  Họ tên<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="input-custom !input-sm focus:border-primary text-black  !border-neutral-400 flex-5/7"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center mb-4">
                <label className="label !text-gray-500 ml-3 flex flex-1/7">
                  Email 
                </label>
                <input
                  type="email"
                  placeholder="nguyenvana@gmail.com"
                  className="input-custom !input-sm focus:border-primary text-black !border-1 !border-neutral-400 w-full flex-5/7"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-center mb-4">
                <label className="label !text-gray-500 ml-3 flex flex-1/7">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="0123456789"
                  className="input-custom !input-sm focus:border-primary text-black  !border-neutral-400 w-full flex-5/7"
                  value={formData.phone}
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex md:flex-row sm:flex-col justify-between gap-1">
                <div className="flex flex-row items-center mb-4 flex-5/12">
                  <label className="label !text-gray-500 ml-3 flex flex-3/6">
                    Tỉnh/Thành phố 
                  </label>
                  <input
                    type="text"
                    placeholder="Cần Thơ"
                    className="input-custom !input-sm focus:border-primary text-black  !border-neutral-400 w-full flex-4/6"
                    value={formData.province}
                    name="province"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-row items-center mb-4 flex-5/12 gap-4">
                  <label className="label !text-gray-500 ml-3 flex flex-3/6 justify-end">
                    Quận/Huyện 
                  </label>
                  <input
                    type="text"
                    placeholder="Ninh Kiều"
                    className="input-custom !input-sm focus:border-primary text-black  !border-neutral-400 w-full flex-4/6"
                    value={formData.district}
                    name="district"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row items-center mb-4">
                <label className="label !text-gray-500 ml-3 flex flex-1/7">
                  Trường 
                </label>
                <input
                  type="text"
                  placeholder="Trường THPT Chuyên Lê Quý Đôn"
                  className="input-custom !input-sm focus:border-primary text-black  !border-neutral-400 w-full flex-5/7"
                  value={formData.school}
                  name="school"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-row items-start mb-4">
                <label className="label !text-gray-500 ml-3 flex flex-1/7">
                  Sở thích nghề nghiệp <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="textarea-custom !textarea-sm text-black  !border-neutral-400 flex-5/7"
                  placeholder="Lập trình viên, Thiết kế đồ họa, ..."
                  value={formData.favorite}
                  name="favorite"
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`btn btn-md w-full mt-4 bg-primary text-white text-md shadow-md
                  ${loading ? 'cursor-not-allowed' : ''}`}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    &nbsp;Đang xử lý...
                  </div>
                ) : (
                  'Đăng ký tư vấn'
                )}
              </button>
            </fieldset>
          </div>
        </div>
        <div className="absolute bottom-10 right-40 z-0">
            <img src="/images/dots.svg" alt="Dot" className=" w-50 opacity-75" />
          </div>
          <div className='absolute top-45 left-47 z-0'>
              <img src='/images/dots.svg' alt="Dot" className="w-50 opacity-75" />
          </div>
      </div>
    </main>
  );
};

export default Register;
