import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const { user , loading } = useContext(UserContext);
    //dato che il componente viene renderizzato prima ancora di settare lo stato user, uso lo stato loading per capire quando procedere
    if (loading) return <p>Aspetta sto caricando</p>;

    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") {
        alert("Access denied - Non sei Admin");
        return <Navigate to="/" />;
    }

    return (children);
}

export default AdminRoute;
