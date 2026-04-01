import { create } from 'zustand';
import type { Stats } from '../Types/ResponseDataTypes';

interface AnalyticsStore {
    globalStats: Stats | null;
    setGlobalStats: (stats: Stats) => void;

    linkStats: Record<string, Stats | null>;
    setLinkStats: (linkId: string, stats: Stats) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
    globalStats: null,
    setGlobalStats: (stats) => set({ globalStats: stats }),

    linkStats: {},
    setLinkStats: (linkId, stats) =>
        set((state) => ({
            linkStats: {
                ...state.linkStats,
                [linkId]: stats,
            },
        })),

}))