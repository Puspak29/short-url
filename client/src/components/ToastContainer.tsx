import { Toast } from "./"
import { useToastStore } from "../stores/useToastStore";

function ToastContainer() {
    const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {toasts.map(toast => (
        <Toast
        key = {toast.id}
        message={toast.message}
        type={toast.type}
        onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default ToastContainer
