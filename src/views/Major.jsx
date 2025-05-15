import React, { useState, useEffect } from 'react';

import majorService from '../services/major.service';
import dualMajorService from '../services/dualMajor.service';

import MajorSection from '../components/Major/MajorSection';
import DualMajorSection from '../components/Major/DualMajorSection';

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [dualMajors, setDualMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await majorService.getAllMajors();
        setMajors(response.data.majors);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDualMajors = async () => {
      try {
        const response = await dualMajorService.getAllDualMajors();
        setDualMajors(response.data.dualMajors);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
    fetchDualMajors();
  }, []);

  return (
    <main className="main relative">
      <div
        id="home"
        className={`relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]
          ${error ? 'flex items-center justify-center' : ''}`}
      >
        {!loading && !error && (
          <>
            <MajorSection majors={majors}></MajorSection>
            <DualMajorSection dualMajors={dualMajors}></DualMajorSection>
          </>
        )}
        {loading && (
          <div className="flex items-center justify-center h-36">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        )}
        {error && (
          <div className="text-center text-rose-500 w-100 h-36 flex items-center justify-center">
            <p className="text-2xl">
              Đã xảy ra lỗi trong quá trình tải dữ liệu. Vui lòng kiểm tra lại
              kết nối internet của bạn hoặc thử lại sau.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
export default Major;
