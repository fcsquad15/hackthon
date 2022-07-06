import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage/index';
import ForumPage from '../pages/ForumPage';
import ErrorPage from '../pages/ErrorPage/index';

function ProtectedRoutes({ redirectTo }) {
    // const isAuth = getItem('token');
    const isAuth = true;
    return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

const Index = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes redirectTo={<ErrorPage />} />}>

                <Route path='/' element={<HomePage />} />
                <Route path='/forum' element={<ForumPage />} />

                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}
export default Index