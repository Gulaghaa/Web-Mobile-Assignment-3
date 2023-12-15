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