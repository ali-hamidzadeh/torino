import axiosInstance from "@/lib/axiosInstance";

export const sendOtp = async (mobile) => {
  const response = await axiosInstance.post("/auth/send-otp", { mobile });
  return response.data;
};

export const checkOtp = async (mobile, code) => {
  const response = await axiosInstance.post("/auth/check-otp", { mobile, code });
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post("/auth/refresh-token", { refreshToken });
  return response.data;
};