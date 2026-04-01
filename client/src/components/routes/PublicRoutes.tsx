import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
export default PublicRoutes
