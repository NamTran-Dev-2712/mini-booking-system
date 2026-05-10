import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Shape stored in the Zustand store — no tokens (they live in httpOnly cookies)
export interface AuthUser {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  expiresIn: string; // ISO string — access token expiry (for client-side UX hints)
  createdAt: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}

// ---------------------------------------------------------------------------
// SSR-safe localStorage wrapper
// Guards against `window` being undefined when running on the server
// ---------------------------------------------------------------------------
const ssrSafeStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ssrSafeStorage),
      // Prevent auto-rehydration during SSR.
      // Call useAuthStore.persist.rehydrate() manually inside a useEffect on the client.
      skipHydration: true,
    },
  ),
);
