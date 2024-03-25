import { Routes, Route } from "react-router-dom";

/** Page layouts **/
import IndexPageLayout from "../layouts/IndexPageLayout";
import AppLayout from "../layouts/AppLayout";

/** Pages **/
import NotFound from "../pages/NotFound";
import Chat from "../pages/Chat";
import Setting from "../pages/Setting";

/** Components **/
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

/** Auth **/
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<IndexPageLayout />}>
        <Route index element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
