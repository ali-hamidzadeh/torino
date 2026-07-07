import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let accessToken = null;
let tokenLoaded = false;      
let fetchTokenPromise = null; 
let refreshPromise = null;    

async function fetchAccessToken() {
  if (fetchTokenPromise) return fetchTokenPromise;

  fetchTokenPromise = fetch("/api/auth")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      accessToken = data?.accessToken ?? null;
      tokenLoaded = true;
      return accessToken;
    })
    .catch(() => {
      tokenLoaded = true;
      return null;
    })
    .finally(() => {
      fetchTokenPromise = null;
    });

  return fetchTokenPromise;
}

async function getAccessToken() {
  if (tokenLoaded) return accessToken; 
  return fetchAccessToken();
}

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise; 

  refreshPromise = fetch("/api/auth/refresh")
    .then(async (res) => {
      if (!res.ok) throw new Error("refresh failed");
      const data = await res.json();
      accessToken = data.newAccessToken; 
      tokenLoaded = true;
      return accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

async function logoutAndRedirect() {
  accessToken = null;
  tokenLoaded = false;
  try {
    await fetch("/api/auth", { method: "DELETE" });
  } catch {}
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}

export function setAccessToken(token) {
  accessToken = token || null;
  tokenLoaded = true;
}
export function clearAccessToken() {
  accessToken = null;
  tokenLoaded = false;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          await logoutAndRedirect();
          return Promise.reject(error);
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        await logoutAndRedirect();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;