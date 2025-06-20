import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const { user , loading } = useContext(UserContext);

    if (loading) return <p>Caricamento...</p>;

    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") {
        alert("Access denied - Non sei Admin");
        return <Navigate to="/" />;
    }

    return (children);
}

export default AdminRoute;
