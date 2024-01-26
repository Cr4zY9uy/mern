import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AppContext } from "../context/app_context";

const ProtectRouter = () => {
    const { isLog } = useContext(AppContext);
    return isLog === true ? <Outlet /> : <Navigate to={"/"} replace />;
}
export default ProtectRouter;