import { create } from 'zustand';
import type { Link } from '../Types/ResponseDataTypes';

interface LinkStore {
    allLinks: Link[];
    setAllLinks: (links: Link[]) => void;
    links: Link[];
    setLinks: (links: Link[]) => void;
    addLink: (link: Link) => void;
    updateLink: (updatedLink: Link) => void;
    deleteLink: (id: string) => void;
}

export const useLinkStore = create<LinkStore>((set) => ({
    allLinks: [],
    setAllLinks: (links: Link[]) => set((state) => ({ allLinks: [...state.allLinks, ...links] })),
    links: [],
    setLinks: (links: Link[]) => set({ links }),
    addLink: (link: Link) => set((state) => ({ links: [...state.links, link] })),
    updateLink: (updatedLink: Link) => set((state) => ({
        links: state.links.map(link => link.id === updatedLink.id ? updatedLink : link)
    })),
    deleteLink: (id: string) => set((state) => ({
        links: state.links.filter(link => link.id !== id)
    })),
}))