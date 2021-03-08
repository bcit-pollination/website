
import axios from 'axios';

const api_path = 'http://pollination.live/api';

export const getReq = async (apiEndpoint) => {
    try {
        const response = await axios.get(api_path + apiEndpoint);

        console.log("Returned from server:");
        console.log("Response Status:");
        console.log(response.status);
        console.log("Response statusText:");
        console.log(response.statusText);
        console.log("Response headers:");
        console.log(response.headers);
        console.log("Response data:");
        console.log(response.data);
        
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

        console.log("Returned from server:");
        console.log("Response Status:");
        console.log(response.status);
        console.log("Response statusText:");
        console.log(response.statusText);
        console.log("Response headers:");
        console.log(response.headers);
        console.log("Response data:");
        console.log(response.data);

        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}
