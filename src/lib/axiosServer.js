import axios from "axios";

const authServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

export default authServer;
