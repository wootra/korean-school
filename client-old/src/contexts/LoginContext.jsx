import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext({
    user: {},
    setUser: () => {},
    logout: () => {},
});

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const logout = useCallback(() => {
        setUser({});
        navigate('/home');
    }, [navigate]);
    const contextValue = useMemo(() => {
        return { user, setUser, logout };
    }, [logout, user]);
    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginInfo = () => {
    return useContext(LoginContext);
};

LoginProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
