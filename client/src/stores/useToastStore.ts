import { create } from "zustand";
import type { ToastItem } from "../Types/ToastType";

interface ToastStore {
    toasts: ToastItem[];
    addToast: (toast: Omit<ToastItem, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => set((state) => ({ toasts: [...state.toasts, { ...toast, id: crypto.randomUUID()}]})),
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(toast => toast.id !== id)}))
}));