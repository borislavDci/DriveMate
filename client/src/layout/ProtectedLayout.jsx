import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
