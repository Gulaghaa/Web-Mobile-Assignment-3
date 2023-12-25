import axios from 'axios';
import { handleFetchError } from './handleErrors';

export const fetchJsonData = async (path) => {
    try {
        const response = await axios.get(path);
        return response.data;
    } catch (error) {
        handleFetchError(error)
    }

};

export const postJsonData = async (url, data) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        return Promise.reject(handleFetchError(error));
    }
};


export const deleteJsonData = async (url) => {
    try {
        await axios.delete(url);
    } catch (error) {
        return Promise.reject(handleFetchError(error));
    }
};