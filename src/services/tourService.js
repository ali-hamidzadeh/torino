import axiosServer from "@/lib/axiosServer";
import axiosInstance from "@/lib/axiosInstance";

export const getTours = async (params = {}) => {
  const response = await axiosServer.get("/tour", { params });
  return response.data;
};

export const getTourClient = async (params = {}) => {
  const response = await axiosInstance.get("/tour", { params });
  return response.data;
};

export const getTourById = async (tourId) => {
  const response = await axiosServer.get(`/tour/${tourId}`);
  return response.data;
};
