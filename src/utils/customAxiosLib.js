
import axios from 'axios';

const api_path = 'http://pollination.live/api';

export const getReq = async (apiEndpoint) => {
    try {
        const response = await axios.get(api_path + apiEndpoint);
        console.log("In function:");
        console.log(response);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("getReq: " + error);
        return error;
    }
}

export const postReq = async (apiEndpoint, jsonObj) => {
    try {
        const response = await axios.post(api_path + apiEndpoint, jsonObj);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}
