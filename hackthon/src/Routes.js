import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ForumPage from './pages/ForumPage';
import ErrorPage from './pages/ErrorPage/index';

const Router = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/forum' element={<ForumPage />} />

            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}
export default Router