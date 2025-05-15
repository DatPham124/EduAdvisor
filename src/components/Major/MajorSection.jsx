import React from 'react';
import { Link } from 'react-router-dom';

const MajorSection = (props) => {
  return (
    <section className="major-section mt-2 mb-20">
      <div className="section-header">
        <p className="!text-4xl font-bold text-center uppercase">
          chuyên ngành đào tạo
        </p>
        <p className="text-md w-1/2 mx-auto text-center !mt-1 !p-0">
          Mở cánh cửa tương lai với những chuyên ngành công nghệ và thiết kế
          tiên phong tại Đại học Ninh Kiều.
        </p>
      </div>
      <div className="section-content mt-10">
        <div className="flex flex-col items-center">
          <div className="w-4xl">
            <table className="table bg-neutral-50 text-black rounded-lg w-full">
              {/* head */}
              <thead className="text-sm text-black">
                <tr>
                  <th>Mã ngành</th>
                  <th>Tên ngành</th>
                  <th>Chỉ tiêu</th>
                  <th>Mã tổ hợp</th>
                  <th>Thời gian đào tạo</th>
                  <th>Danh hiệu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {props.majors.map((major) => (
                  <tr
                    key={major._id}
                    className="!border-t-1 border-gray-400 text-xs rounded-lg"
                  >
                    <td>{major.code}</td>
                    <td>{major.name}</td>
                    <td className="text-center">{major.quantity}</td>
                    <td></td>
                    <td className="text-center">{major.duration}</td>
                    <td className="text-center">{major.tilte}</td>
                    <td>
                      <Link
                        to={`/major/${major._id}`}
                        className="text-blue-500 hover:text-blue-700 italic underline"
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
export default MajorSection;
