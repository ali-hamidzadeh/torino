"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function AuthProvider({ children }) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const authRes = await fetch("/api/auth");
        if (!authRes.ok) return;

        const { accessToken } = await authRes.json();

        const userRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        login(userRes.data, accessToken);
      } catch {
        logout();
      }
    };

    restoreUser();
  }, []);

  return children;
}