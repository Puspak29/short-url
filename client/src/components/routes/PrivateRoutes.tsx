import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" replace />;
    }
    return <>{children}</>;
};

export default PrivateRoutes;