"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import axiosInstance, { setAccessToken } from "@/lib/axiosInstance";

export default function AuthProvider({ children }) {
  const { login, logout, openLoginModal } = useAuthStore();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        let currentToken = null;

        const authRes = await fetch("/api/auth");

        if (authRes.ok) {
          const authData = await authRes.json();
          currentToken = authData.accessToken;
          setAccessToken(currentToken);
        } else {
          const refreshRes = await fetch("/api/auth/refresh");

          if (!refreshRes.ok) {
            logout();
            return;
          }

          const refreshData = await refreshRes.json();
          currentToken = refreshData.newAccessToken;
          setAccessToken(currentToken);
        }

        const userRes = await axiosInstance.get("/user/profile");
        login(userRes.data, currentToken);
      } catch {
        logout();
      }
    };

    restoreUser();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      openLoginModal();
    }
  }, []);

  return children;
}
