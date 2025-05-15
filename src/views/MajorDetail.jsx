import React, { useEffect, useState } from 'react';

import majorService from '../services/major.service';
import { useParams } from "react-router-dom";

const MajorDetail = () => {
    const { id } = useParams();
const [major, setMajor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await majorService.getMajor(id);
        setMajor(response.data.major);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMajor();
  }, [id]);

  if (loading ) {
    return <div className='flex items-center justify-center'><span className="loading loading-infinity loading-xl"></span></div>;
  } 
   if (error ) {
    return <div className='flex items-center justify-center'><p>{error.message}</p></div>;
  } 
    return(
        <main className="main relative">
            <h1>{major.name}</h1>
        </main>
    );
}

export default MajorDetail;