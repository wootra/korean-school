import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { SERVER_URL } from '../env';
import PropTypes from 'prop-types';

const BookContext = createContext({
    books: [],
    setBooks: () => {},
    initBooks: () => {},
});
const emptyArr = [];

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState(null);
    const loadgingRef = useRef(false);
    const initBooks = useCallback(() => {
        if (!books && loadgingRef.current === false) {
            loadgingRef.current = true;
            fetch(`${SERVER_URL}/api/books?limit=5`)
                .then(res => res.json())
                .then(data => setBooks(data))
                .catch(err => console.log(err))
                .finally(() => {
                    loadgingRef.current = true;
                });
        }
    }, [books]);

    const contextValue = useMemo(() => {
        return {
            books: books ?? emptyArr,
            initBooks,
            setBooks,
        };
    }, [books, initBooks, setBooks]);

    useEffect(() => {
        initBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooks = () => {
    return useContext(BookContext);
};

BookProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
