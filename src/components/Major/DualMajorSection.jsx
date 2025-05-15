import React from 'react';
import { Link } from 'react-router-dom';

const DualMajorSection = (props) => {
  console.log(props);

  return (
    <section className="major-section mt-40 mb-40">
      <div className="section-header">
        <p className="!text-4xl font-bold text-center uppercase">
          ngành học song song nhận bằng quốc tế
        </p>
        <p className="text-large w-1/2 mx-auto text-center !mt-1">
          Nhân đôi cơ hội, kiến tạo tương lai đa năng với chương trình học song
          song Lập trình và Mỹ thuật đa phương tiện.
        </p>
      </div>
      <div className="section-content mt-10">
        <div className="flex flex-col items-center">
          <div className="w-4xl">
            <table className="table table-lg bg-neutral-50 text-black w-full">
              {/* head */}
              <thead className="text-sm">
                <tr>
                  <th className="w-4/12">Tên ngành</th>
                  <th className="text-center w-1/12">Chỉ tiêu</th>
                  <th className="text-center w-1/12">Thời gian đào tạo</th>
                  <th className="text-center 4/12">Danh hiệu</th>
                  <th className="w-2/12"></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {props.dualMajors.map((dualMajor) => (
                  <tr
                    key={dualMajor.id}
                    className="!border-t-1 border-gray-400 text-xs"
                  >
                    <td className="">{dualMajor.name}</td>
                    <td className="text-center">{dualMajor.quantity}</td>
                    <td className="text-center">{dualMajor.duration}</td>
                    <td className="text-center">{dualMajor.degree}</td>
                    <td>
                      <Link
                        to={`/major/${dualMajor._id}`}
                        className="text-blue-500 hover:text-blue-700 italic"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DualMajorSection;
