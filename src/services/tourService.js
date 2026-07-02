const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/tour?${queryString}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("خطا در دریافت تورها");
  return res.json();
};

export const getTourById = async (tourId) => {
  const res = await fetch(`${BASE_URL}/tour/${tourId}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("تور یافت نشد");
  return res.json();
};

export const getToursClient = async (params = {}) => {
  const { default: axiosInstance } = await import("@/lib/axiosInstance");
  const response = await axiosInstance.get("/tour", { params });
  return response.data;
};