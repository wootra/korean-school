import styles from './App.module.css';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import './pages/page-common.css';

import Home from './pages/Home';
import About from './pages/About';
import Rent from './pages/Rent';
import Lend from './pages/Lend';
import Profile from './pages/Profile';
import LendEdit from './pages/LendEdit';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserInfoRoute from './pages/UserInfoRoute';
import { BookProvider } from './contexts/BookContext';
import { LoginProvider } from './contexts/LoginContext';

function App() {
    return (
        <div className={styles.app}>
            <BookProvider>
                <LoginProvider>
                    <Nav />
                    <main>
                        <Routes path='/'>
                            <Route index element={<Home />} />
                            <Route path='home' element={<Home />} />
                            <Route path='about' element={<About />} />
                            <Route path='rent' element={<Rent />} />
                            <Route path='lend' element={<Lend />} />
                            <Route
                                path='userinfo/*'
                                element={<UserInfoRoute />}
                            >
                                <Route index element={<Profile />} />
                                <Route path='profile' element={<Profile />} />
                                <Route path='lend' element={<LendEdit />} />
                            </Route>
                            <Route path='sign-up' element={<SignUp />} />
                            <Route path='log-in' element={<LogIn />} />
                        </Routes>
                    </main>
                </LoginProvider>
            </BookProvider>
        </div>
    );
}

export default App;
