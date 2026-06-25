"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/lib/axiosInstance";

export default function AuthProvider({ children }) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const authRes = await fetch("/api/auth");

        if (!authRes.ok) return;

        const userRes = await axiosInstance.get("/user/profile");
        login(userRes.data, null);
      } catch (err) {
        logout();
      }
    };

    restoreUser();
  }, []);

  return children;
}
