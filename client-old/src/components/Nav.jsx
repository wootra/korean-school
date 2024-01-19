import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import styles from './Nav.module.css';
import { useLoginInfo } from '../contexts/LoginContext';
import NavSearch from './NavSearch';
const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const { user, logout } = useLoginInfo();
    const onNavClick = (e, { name }) => {
        if (pathname !== name) {
            navigate(name);
        }
    };

    const isSearchable =
        location.pathname === '/home' || location.pathname === '/rent';
    const onUserInfoClick = (e, { value }) => navigate(value);
    return (
        <nav className={`${styles.nav}`}>
            <Menu pointing secondary color='violet'>
                <Image src='/logo.png' className='rounded-full' />
                <Menu.Item
                    name='/home'
                    active={pathname === '/home'}
                    onClick={onNavClick}
                >
                    Home
                </Menu.Item>

                <Menu.Item
                    name='/rent'
                    active={pathname === '/rent'}
                    onClick={onNavClick}
                >
                    Rent
                </Menu.Item>
                {user.id && (
                    <Menu.Item
                        name='/lend'
                        active={pathname === '/lend'}
                        onClick={onNavClick}
                    >
                        Lend
                    </Menu.Item>
                )}

                <Menu.Menu position='right'>
                    <NavSearch isSearchable={isSearchable} />
                    {user.name ? (
                        <Dropdown item icon='setting' text={user.name}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    value='/userinfo/profile'
                                    content='/userinfo/profile'
                                    onClick={onUserInfoClick}
                                >
                                    Profile
                                </Dropdown.Item>

                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout}>
                                    Log Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Menu.Item
                            name='/log-in'
                            active={pathname === '/log-in'}
                            onClick={onNavClick}
                        >
                            Log In
                        </Menu.Item>
                    )}
                </Menu.Menu>
            </Menu>
        </nav>
    );
};

export default Nav;
