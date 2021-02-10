const axios = require('axios');

const postReq = async (url, payload) => {
    try {
        const res = await axios.post(url, payload);
        return res;
    } catch (error) {
        console.log("error", error);
    }
};

let hello = async () => 
    { 
    return greeting = await Promise.resolve("Hello");
    };

hello().then(console.log)