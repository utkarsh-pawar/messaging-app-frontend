import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isUser } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const isUser = useSelector((state) => state.user.isUser);
  if (!isUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
