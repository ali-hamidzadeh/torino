import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendOtp = async (mobile) => {
  const response = await axios.post(`${BASE_URL}/auth/send-otp`, { mobile });
  return response.data;
};

export const checkOtp = async (mobile, code) => {
  const response = await axios.post(`${BASE_URL}/auth/check-otp`, {
    mobile,
    code,
  });
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};
