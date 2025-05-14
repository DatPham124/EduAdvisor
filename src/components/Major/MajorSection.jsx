import React, { useEffect, useState } from "react";

import majorService from "../../services/major.service";
import { Link } from "react-router-dom";


const MajorSection = () => {
    const [majors, setMajors] = useState([]);
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

        fetchMajors();
    }, []);
    
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <section className="major-section mt-10 mb-20">
            <div className="section-header">
                <p className="text-3xl font-bold text-center uppercase">chuyên ngành đào tạo</p>
                <p className="text-large w-1/2 mx-auto text-center mt-4">
                    Mở cánh cửa tương lai với những chuyên ngành công nghệ và thiết kế tiên phong tại Đại học Ninh Kiều.
                </p>
            </div>
            <div className="section-content mt-10">
                <div className="flex flex-col items-center">
                    <div className="w-4xl">
                        <table className="table bg-base-100 text-black">
                            {/* head */}
                            <thead className="text-sm">
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
                                {majors.map((major) => (
                                    <tr key={major.id} className="!border-y-1 border-gray-400 text-xs">
                                        <td>{major.code}</td>
                                        <td>{major.name}</td>
                                        <td className="text-center">{major.quantity}</td>
                                        <td></td>
                                        <td className="text-center">{major.duration}</td>
                                        <td className="text-center">{major.tilte}</td>
                                        <td>
                                            <Link to={`/major/${major.code}`} className="text-blue-500 hover:text-blue-700 italic underline" >
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
}
export default MajorSection;