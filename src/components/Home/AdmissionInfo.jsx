import React, { useEffect, useState } from 'react';

import admissionInfoService from '../../services/admissionInfo.service';
import { Link } from 'react-router-dom';

const AdmissionInfo = () => {
  const [infos, setInfo] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchInfo = async () => {
          try {
            const response = await admissionInfoService.getAllInfo();
             setInfo(response?.data.adInfo || []);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchInfo();
      }, []);
    if (loading || error) {
      return <div className='flex items-center justify-center'><span className="loading loading-infinity loading-xl"></span></div>;
    }   
  return (
    <section id="services" class="section-area">
      <div class="container">
        <div class="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h2 class="mb-6">Hình thức tuyển sinh </h2>
          <p>
            Tuyển sinh linh hoạt, thủ tục đơn giản - Tiếp cận tri thức công nghệ
            và thiết kế chưa bao giờ dễ dàng hơn.
          </p>
        </div>
      {infos.map((info) => (
        <div class="row">
          <div class="scroll-revealed col-12 ">
            <div class="group hover:-translate-y-1">
              <div class="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-primary text-primary-color">
                <i class="lni lni-flag"></i>
              </div>
              <div class="w-full">
                <h4 class="text-[1.25rem]/tight font-semibold mb-5">
                  Đối tượng
                </h4>
                <p>
                  {info.object}
                </p>
              </div>
            </div>
          </div>

          <div class="scroll-revealed col-12 ">
            <div class="group hover:-translate-y-1">
              <div class="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-primary text-primary-color">
                <i class="lni lni-flag"></i>
              </div>
              <div class="w-full">
                <h4 class="text-[1.25rem]/tight font-semibold mb-5">
                  Hình thức
                </h4>
                <p>
                  {info.form}
                </p>
              </div>
            </div>
          </div>
          <div class="scroll-revealed col-12 ">
            <div class="group hover:-translate-y-1">
              <div class="w-[70px] h-[70px] rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-primary text-primary-color">
                <i class="lni lni-flag"></i>
              </div>
              <div class="w-full">
                <h4 class="text-[1.25rem]/tight font-semibold mb-5">
                  Học bổng
                </h4>
                <p>
                 {info.scholarship}
                </p>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};

export default AdmissionInfo;
