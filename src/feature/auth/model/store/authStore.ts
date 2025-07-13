import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  //tokenLogic
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  getAccessToken: () => string | null;
  //authLogic
  isAuth: boolean;
  setIsAuth: (status: boolean) => void;
  getIsAuth: () => boolean;
  //refreshTokensLogic
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //token

      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token, isAuth: !!token }),
      clearAccessToken: () => set({ accessToken: null, isAuth: false }),
      getAccessToken: () => get().accessToken,
      //Auth

      isAuth: false,
      setIsAuth: (status: boolean) => set({ isAuth: status }),
      getIsAuth: () => get().isAuth,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
