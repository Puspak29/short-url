import { create } from 'zustand';
import type { Link } from '../Types/ResponseDataTypes';

interface LinkStore {
  pageCache: Record<number, Link[]>;

  setPageLinks: (page: number, links: Link[]) => void;
  hasPage: (page: number) => boolean;
  getPageLinks: (page: number) => Link[] | undefined;
  clearCache: () => void;
  toggleUpdate: (page: number, linkId: string) => void;
}

export const useLinkStore = create<LinkStore>((set, get) => ({
  pageCache: {},

  setPageLinks: (page, links) =>
    set((state) => ({
      pageCache: {
        ...state.pageCache,
        [page]: links, // overwrite safely
      },
    })),

  hasPage: (page) => {
    return !!get().pageCache[page];
  },

  getPageLinks: (page) => {
    return get().pageCache[page];
  },

  clearCache: () => set({ pageCache: {} }),
  toggleUpdate: (page, linkId) =>
    set((state) => {
      const pageLinks = state.pageCache[page];
      if (!pageLinks) return state; // no page, no change

      const updatedLinks = pageLinks.map((link) =>
        link._id === linkId ? { ...link, isActive: !link.isActive } : link
      );
      return {
        pageCache: {
          ...state.pageCache,
          [page]: updatedLinks,
        },
      };
    })
}));