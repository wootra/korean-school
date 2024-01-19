import { Outlet } from 'react-router-dom';
import Nav from './components/pages/Nav';

const PublicLayout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
};

export default PublicLayout;
