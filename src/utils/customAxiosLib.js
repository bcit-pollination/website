
import axios from 'axios';

const api_path = 'http://pollination.live/api';

const logResponse = (response) => {
    console.log("Returned from server:");
    console.log("Response Status:");
    console.log(response.status);
    console.log("Response statusText:");
    console.log(response.statusText);
    console.log("Response headers:");
    console.log(response.headers);
    console.log("Response data:");
    console.log(response.data);
}

const getAxiosInstance = () => {
    let jwt_token = sessionStorage.getItem("jwt");
    console.log(jwt_token);
    let axiosInstance =  axios.create({
        headers: {
            "Authorization" : `Bearer ${jwt_token}`,
        }
    }); 
    return axiosInstance;
}

export const getReq = async (apiEndpoint) => {
    try {
        const response = await getAxiosInstance().get(
            api_path + apiEndpoint,
        );
        logResponse(response);
        return response;

    } catch (error) {
        // Handle Error Here
        console.log("getReq: " + error);
        return error;
    }
}

export const postReq = async (apiEndpoint, jsonObj) => {
    try {
        const response = await getAxiosInstance().post(
            api_path + apiEndpoint, 
            jsonObj, 
        );
        logResponse(response);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}