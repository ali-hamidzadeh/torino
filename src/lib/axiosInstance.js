import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authResponse = await fetch("/api/auth");
    if (authResponse.ok) {
      const { accessToken } = await authResponse.json();
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await fetch("/api/auth/refresh");

        if (!refreshRes.ok) {
          await fetch("/api/auth", { method: "DELETE" });
          window.location.href = "/";
          return Promise.reject(error);
        }

        const { newAccessToken } = await refreshRes.json();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        await fetch("/api/auth", { method: "DELETE" });
        window.location.href = "/";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
