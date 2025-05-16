import React, { useEffect, useState } from 'react';

import dualMajorService from '../../services/dualMajor.service';
import { Link } from 'react-router-dom';

const DualMajors = () => {
    const [dualmajors, setDualMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
            const fetchDualMajors = async () => {
            try {
                const response = await dualMajorService.getAllDualMajors();
                setDualMajors(response?.data.dualMajors || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
            };
        
            fetchDualMajors();
        }, []);
        
        if (loading || error) {
            return <div className='flex items-center justify-center'><span className="loading loading-infinity loading-xl"></span></div>;
        } 
        if(error) {return <div className='flex items-center justify-center'>{error.message}</div>;}
    return (
    <section id="pricing" className="section-area">
      <div className="container">
        <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h2 className="mb-6">Nhận bằng song song</h2>
          <p>
            Khác biệt và vượt trội: Chương trình bằng song song, mở rộng kiến thức và kỹ năng đa lĩnh vực.
          </p>
        </div>

        <div className="row">
          
{dualmajors.map((dualmajor) => ( 
          <div className="scroll-revealed col-12 sm:col-6 ">
            <div className="rounded-xl py-12 px-9 bg-body-light-1 dark:bg-body-dark-12/10 text-center shadow-lg">
              <div>
                <h4 className="font-semibold inline-block relative pl-4 ">
                    {dualmajor.name}
                  </h4>
                <p className="line-clamp-2">
                  {dualmajor.description}
                </p>
                <div className="pt-8">
                  
                </div>
              </div>
              <div className="pt-8 pb-10">
                <Link to={`/dualmajor/${dualmajor._id}`}
                  className="inline-block font-medium px-6 py-3 rounded-md bg-primary text-primary-color hover:bg-primary-light-10 dark:hover:bg-primary-dark-10 hover:text-primary-color focus:bg-primary-light-10 dark:focus:bg-primary-dark-10 focus:text-primary-color">
                    Xem chi tiết
                  </Link>
              </div>
              <div>
                <ul>
                  <li className="text-left relative mb-3 inline-flex gap-3 w-full">
                    <i className="lni lni-checkmark-circle text-primary text-base leading-[24px]"></i>
                    <span>Thời gian đào tạo: {dualmajor.duration}</span>
                  </li>
                  <li className="text-left relative mb-3 inline-flex gap-3 w-full">
                    <i className="lni lni-checkmark-circle text-primary text-base leading-[24px]"></i>
                    <span>Bằng cấp: {dualmajor.degree}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

))}
        </div>
      </div>
    </section>

    );
}

export default DualMajors;