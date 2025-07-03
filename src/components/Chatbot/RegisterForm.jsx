// components/RegisterForm.jsx
import React, { useState } from 'react';
import userService from '../../services/register.service';

const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = formData.name.trim() && formData.phone.trim() && formData.favorite.trim();
    if (!isValid) {
      alert('Hãy điền đầy đủ thông tin để được tư vấn');
      return;
    }

    try {
      setLoading(true);
      const user = await userService.register(formData);
      onSuccess(user); // báo cho Chatbot biết đã đăng ký
    } catch (err) {
      console.error('Lỗi đăng ký:', err);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <h3 className="text-lg font-bold mb-2 text-primary text-center">Đăng ký tư vấn</h3>

      <input type="text" name="name" value={formData.name} onChange={handleChange}
        className="resgister-input input w-full " placeholder="Họ tên *" required />

      <input type="email" name="email" value={formData.email} onChange={handleChange}
        className="resgister-input input w-full" placeholder="Email" />

      <input type="text" name="phone" value={formData.phone} onChange={handleChange}
        className="resgister-input input w-full" placeholder="Số điện thoại *" required />

      <input type="text" name="province" value={formData.province} onChange={handleChange}
        className="resgister-input input w-full" placeholder="Tỉnh/Thành phố" />

      <input type="text" name="district" value={formData.district} onChange={handleChange}
        className="resgister-input input w-full" placeholder="Quận/Huyện" />

      <input type="text" name="school" value={formData.school} onChange={handleChange}
        className="resgister-input input w-full" placeholder="Trường học" />

      <textarea name="favorite" value={formData.favorite} onChange={handleChange}
        className="resgister-input textarea w-full" placeholder="Sở thích nghề nghiệp *" required />

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  );
};

export default RegisterForm;
