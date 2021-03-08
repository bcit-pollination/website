
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

export const getReq = async (apiEndpoint) => {
    try {
        const response = await axios.get(api_path + apiEndpoint);
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
        const response = await axios.post(api_path + apiEndpoint, jsonObj);
        logResponse(response);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}

export const getReqA = async (apiEndpoint, jwt_token) => {
    try {
        const response = await axios.get(
            api_path + apiEndpoint,
            { headers: {
                "Authorization" : `Bearer ${jwt_token}`,
            }
        });
        logResponse(response);
        return response;
    } catch (error) {
        // Handle Error Here
        console.log("getReq: " + error);
        return error;
    }
}

export const postReqA = async (apiEndpoint, jwt_token, jsonObj) => {
    try {
        console.log(jwt_token);
        // let axiosInstance =  axios.create({
        //     baseURL: api_path,
        //     headers: {
        //         'Authorization': jwt_token,
        //         'Content-Type': 'application/json'
        //     }
        // }); 

        // const response = await axiosInstance.post(apiEndpoint,{jsonObj});

        const response = await axios.post(
            api_path + apiEndpoint, 
            jsonObj, 
            { headers: {
                "Authorization" : `Bearer ${jwt_token}`,
            } 
        });

        logResponse(response);

        return response;
    } catch (error) {
        // Handle Error Here
        console.log("postReq: " + error);
        return error;
    }
}