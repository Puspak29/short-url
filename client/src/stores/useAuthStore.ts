import { create } from 'zustand';
import type { Link, User } from '../Types/ResponseDataTypes';
import { checkAuth } from '../actions/checkAuth';

interface DashboardData {
    stats: {
        activeLinks: number,
        customLinks: number,
        totalClicks: number,
        totalLinks: number,
    },
    lastFiveLinks: Link[] | []
}

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;

    dashboardData: DashboardData;

    checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user: User | null) => set({ user, isAuthenticated: !!user, isLoading: false }),
    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    logout: () => set({ user: null, isAuthenticated: false, dashboardData: {
        stats: {
            activeLinks: 0,
            customLinks: 0,
            totalClicks: 0,
            totalLinks: 0
        },
        lastFiveLinks: []
    } }),

    dashboardData: {
        stats: {
            activeLinks: 0,
            customLinks: 0,
            totalClicks: 0,
            totalLinks: 0,
        },
        lastFiveLinks: []
    },

    checkAuthStatus: async() => {
        set({ isLoading: true });

        try {
            const { isAuth, user, dashboardData } = await checkAuth();
            set({ user, isAuthenticated: isAuth, dashboardData });
        }
        catch (error) {
            set({ user: null, isAuthenticated: false, dashboardData: {
                stats: {
                    activeLinks: 0,
                    customLinks: 0,
                    totalClicks: 0,
                    totalLinks: 0
                },
                lastFiveLinks: []
            } });
        }
        finally {
            set({ isLoading: false });
        }
    }
}));