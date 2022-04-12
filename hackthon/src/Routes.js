import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main/index'
import ErrorPage from './pages/ErrorPage/index';

const Router = () => {

    return(
        <Routes>
            <Route path='/' element={<Main />} />

            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}
export default Router