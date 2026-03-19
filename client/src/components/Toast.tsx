import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";
import type { ToastType } from "../Types/ToastType";

const toastConfig : Record< ToastType, { styles: string, icon: React.ReactNode }> = {
    success: {
        styles: 'bg-zinc-900 text-white border-emerald-500/20',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    },
    error: {
        styles: 'bg-rose-900 text-white border-rose-500/20',
        icon: <AlertCircle className="w-4 h-4 text-rose-400" />
    },
    info: {
        styles: 'bg-blue-900 text-white border-blue-500/20',
        icon: <Info className="w-4 h-4 text-blue-400" />
    },
    warning: {
        styles: 'bg-yellow-900 text-white border-yellow-500/20',
        icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />
    }
}

const Toast = ({ message, type, onClose, duration = 3000 } : { message: string; type: ToastType; onClose: () => void; duration?: number }) => {
    const { styles, icon } = toastConfig[type];

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border ${styles}`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70"><X className="w-4 h-4" /></button>
    </div>
    );
}

export default Toast;