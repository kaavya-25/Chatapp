import { useContext } from "react";
import { Navigate, Outlet , useLocation } from "react-router-dom";
import { AppContext } from "../custom_hooks/context";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { currentUser, currentAccount } = useContext(AppContext);
  if (location.pathname == '/signup' ) {
    return currentAccount ? <Outlet/> : <Navigate to="/" />
  } else {
    return currentUser ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectedRoutes;




