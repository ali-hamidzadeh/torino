import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  showLoginModal: false,

  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),

  login: (userData, accessToken, refreshToken) =>
    set({
      user: userData,
      accessToken: accessToken,
      refreshToken: refreshToken,
      isLoggedIn: true,
      showLoginModal: false,
    }),

  logout: async () => {
    await fetch("/api/auth", { method: "DELETE" });
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    });
  },
}));
