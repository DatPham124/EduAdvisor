import React, { useEffect, useState } from "react";

import majorService from "../../services/major.service";
import { Link } from "react-router-dom";


const DualMajorSection = () => {
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
        <section className="major-section mt-40 mb-40">
            <div className="section-header">
                <p className="text-3xl font-bold text-center uppercase">ngành học song song nhận bằng quốc tế</p>
                <p className="text-large w-1/2 mx-auto text-center mt-4">
                Nhân đôi cơ hội, kiến tạo tương lai đa năng với chương trình học song song Lập trình và Mỹ thuật đa phương tiện.
                </p>
            </div>
            <div className="section-content mt-10">
                <div className="flex flex-col items-center">
                    <div className="w-4xl">
                        <table className="table bg-neutral-100">
                            {/* head */}
                            <thead className="text-sm">
                            <tr>
                                <th>Tên ngành</th>
                                <th>Chỉ tiêu</th>
                                <th>Thời gian đào tạo</th>
                                <th>Danh hiệu</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {majors.map((major) => (
                                    <tr key={major.id} className="!border-y-1 border-gray-400 text-xs">
                                        <td>{major.name}</td>
                                        <td className="text-center">{major.quantity}</td>
                                        <td className="text-center">{major.duration}</td>
                                        <td className="text-center">{major.tilte}</td>
                                        <td>
                                            <Link to={`/major/${major.id}`} className="text-blue-500 hover:text-blue-700 italic underline" >
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
export default DualMajorSection;