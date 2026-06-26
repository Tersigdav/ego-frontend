import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/api.js";

export default function PrivateRoute({ children }) {
    return isAuthenticated()
        ? children
        : <Navigate to="/" replace />;
}