import { createBrowserRouter } from 'react-router-dom';
import { fakeAuthProvider } from './lib/auth';
import PublicLayout from './PublicLayout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import AdminLayout from './AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminQueries from './pages/admin/AdminQueries';
import SignIn from '@/pages/SignIn';

export const routes = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        loader() {
            // Our root route always provides the user, if logged in
            return { user: fakeAuthProvider.username };
        },
        Component: PublicLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'classes',
                Component: Classes,
            },
            {
                path: 'sign-in',
                Component: SignIn,
            },
            {
                path: 'admin',
                Component: AdminLayout,
                children: [
                    {
                        index: true,
                        Component: AdminHome,
                    },
                    {
                        path: 'queries',
                        Component: AdminQueries,
                    },
                ],
            },
        ],
    },
]);
