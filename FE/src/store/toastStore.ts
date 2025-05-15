import { create } from 'zustand';

interface ToastState {
    type: 'success' | 'warning';
    message: string;
    visible: boolean;
    showToast: (type: 'success' | 'warning', message: string) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    type: 'success',
    message: '',
    visible: false,
    showToast: (type, message) => {
        set({ type, message, visible: true });
        setTimeout(() => set({ visible: false }), 5000); //3초후 자동 숨김
    },
    hideToast: () => set({ visible: false }),
}));