import React, { useEffect, useState } from 'react';

import dualMajorService from '../services/dualMajor.service';
import { useParams } from 'react-router-dom';

const DualMajorDetail = () => {
  const { id } = useParams();
  const [dualMajor, setDualMajor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDualMajor = async () => {
      try {
        const response = await dualMajorService.getDualMajor(id);
        setDualMajor(response.data.dualMajor);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDualMajor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <main className="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container tilte mb-5">
          <div className="flex flex-col items-center justify-center">
            <p className="!text-4xl font-bold text-white uppercase">
              {dualMajor.name}
            </p>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col  justify-center bg-neutral-100 rounded-box mx-auto p-6 shadow-md mb-10 !z-10">
            <div className='mb-5'>
              <h5 className='mb-5'>Thông tin chung</h5>
              <p className='text-base font-small text-body-light-12'>Tên ngành: {dualMajor.name}</p>
              <p className='text-base font-small text-body-light-12'>Chỉ tiêu: {dualMajor.quantity}</p>
              <p className='text-base font-small text-body-light-12'>Thời gian đào tạo: {dualMajor.duration}</p>
              <p className='text-base font-small text-body-light-12'>Bằng cấp: {dualMajor.degree}</p>
            </div>
            <div className='mb-5'>
               <h5 className='mb-5'>Giới thiệu</h5>
                <p className='text-base font-small text-body-light-12'>{dualMajor.description}</p>
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

export default DualMajorDetail;
