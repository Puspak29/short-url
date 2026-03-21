import { create } from 'zustand';
import type { Link, User } from '../Types/ResponseDataTypes';
import { checkAuth } from '../actions/checkAuth';

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;

    dashboardLinks: Link[];

    checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user: User | null) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    logout: () => set({ user: null, isAuthenticated: false }),

    dashboardLinks: [],

    checkAuthStatus: async() => {
        set({ isLoading: true });

        try {
            const { isAuth, user } = await checkAuth();
            set({ user, isAuthenticated: isAuth });
        }
        catch (error) {
            set({ user: null, isAuthenticated: false });
        }
        finally {
            set({ isLoading: false });
        }
    }
}));