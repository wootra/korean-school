import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Classes from './pages/Classes';
import AdminLayout from './AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminQueries from './pages/admin/AdminQueries';
import SignIn from './pages/SignIn';
import Nav from './components/pages/Nav';

function App() {
    return (
        <div className=''>
            <Nav />
            <Routes>
                <Route index element={<Home />} />
                <Route path='classes' element={<Classes />} />
                <Route path='admin/*' element={<AdminLayout />}>
                    <Route index element={<AdminHome />} />
                    <Route path='queries' element={<AdminQueries />} />
                </Route>
                <Route path='sign-in' element={<SignIn />} />
            </Routes>
        </div>
    );
}

export default App;
