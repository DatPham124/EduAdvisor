import axios from 'axios';


const commonConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
};

const formDatatConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
};

export default (baseURL) => {
    return {
        json: axios.create({
            baseURL: `http://127.0.0.1:8080${baseURL}`,
            ...commonConfig
        }),
        formData: axios.create({
            baseURL: `http://127.0.0.1:8080${baseURL}`,
            ...formDatatConfig
        }),
    };
};