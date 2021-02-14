
import axios from 'axios';

export const getReq = async (apiEndpoint) => {
    try {
        const response = await axios.get(apiEndpoint);
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
        const response = await axios.post(apiEndpoint, jsonObj);
        console.log("In function:");
        console.log(response);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}
