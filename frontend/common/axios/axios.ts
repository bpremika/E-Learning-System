import axios from "axios";

const client = axios.create({
    baseURL: process.env.API_URL,
});

client.defaults.withCredentials = true;

export { client };
