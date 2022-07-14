/* eslint-disable object-curly-newline */
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage/index";
import ForumPage from "../pages/ForumPage";
import HomePage from "../pages/HomePage";
import MenthorPage from "../pages/MenthorPage";

// eslint-disable-next-line react/prop-types
function ProtectedRoutes({ redirectTo }) {
  // const isAuth = getItem('token');
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

function Index() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes redirectTo={<ErrorPage />} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/mentoria/:habilidadeId" element={<MenthorPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default Index;
