import React, { useEffect, useState } from 'react';

import majorService from '../../services/major.service';
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://localhost:8080"; // server port
const PopularMajors = () => {

  const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMajors = async () => {
        try {
          const response = await majorService.getAllMajors({isPopular:true});
           setMajors(response?.data.majors || []);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMajors();
    }, []);
  
    if (loading || error) {
      return <div className='flex items-center justify-center'><span className="loading loading-infinity loading-xl"></span></div>;
    } 
  return (
    <section id="portfolio" className="section-area">
      <div className="container">
        <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
          <h2 className="mb-6">Ngành học thịnh hành</h2>
          <p>
            Khám phá các ngành học đa dạng từ lập trình, thiết kế đồ họa đến
            công nghệ thông tin
          </p>
        </div>

        <div className="scroll-revealed portfolio-grid row">
          {majors.map((major) => (
          <div key={major._id} className="portfolio col-12 sm:col-6 lg:col-4">
            <article className="group">
              <div className="relative overflow-hidden w-full aspect-[4/3] rounded-xl">
                <img
                  src={`${API_BASE_URL}/uploads/images/${major.image}`}
                  alt={major.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full aspect-[4/3] flex items-center justify-center bg-body-light-1/75 scale-[0.15] rounded-xl opacity-0 invisible group-hover:scale-95 group-hover:opacity-100 group-hover:visible">
                  <div className="flex flex-wrap  p-4">
                    <div className="inline-block relative">
                      <Link
                        to={`/major/${major._id}`}
                        className="portfolio-box text-[1.75rem] text-primary-color bg-primary z-10 w-[60px] aspect-square rounded-lg text-center inline-flex items-center justify-center hover:bg-primary-light-10 hover:text-primary-color dark:hover:bg-primary-dark-10 dark:hover:text-primary-color focus:bg-primary-light-10 focus:text-primary-color dark:focus:bg-primary-dark-10 dark:focus:text-primary-color"
                      >
                        <i className="lni lni-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="mb-2">
                  <a
                    href="javascript:void(0)"
                    className="text-[1.5rem] leading-tight text-inherit"
                  >
                    {major.name}
                  </a>
                </h4>
                <p className="line-clamp-3">
                  {major.description}
                </p>
              </div>
            </article>
          </div>
        ))}
          
        </div>
      </div>
    </section>
  );
};

export default PopularMajors;
