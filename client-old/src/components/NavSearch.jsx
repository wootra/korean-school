import PropTypes from 'prop-types';
import { Checkbox, Input, Menu } from 'semantic-ui-react';
import styles from './NavSearch.module.css';
import { useState } from 'react';
import { SERVER_URL } from '../env';
import { useBooks } from '../contexts/BookContext';

const LIMIT = 10;

const NavSearch = ({ isSearchable }) => {
    const [checked, setChecked] = useState({});
    const onChecked = (e, value) => {
        setChecked(checked => {
            return { ...checked, [value.name]: !checked[value.name] };
        });
    };
    const { setBooks } = useBooks();
    const onSearchChange = (e, { value }) => {
        const queries = Object.keys(checked)
            .filter(key => checked[key])
            .join('&');

        fetch(
            `${SERVER_URL}/api/books?limit=${LIMIT}${
                queries ? `&${queries}` : ''
            }&search=${value}`
        )
            .then(res => res.json())
            .then(books => setBooks(books))
            .catch(err => console.log(err));
        console.log(value);
    };
    return (
        isSearchable && (
            <div className={styles.searchBar}>
                <Menu.Item>
                    <Input
                        icon={{ name: 'search', link: false }}
                        placeholder='Search books...'
                        onChange={onSearchChange}
                    />
                </Menu.Item>
                <div className={`${styles.searchDrawer} flex gap-4 flex-wrap`}>
                    <Checkbox
                        name='title'
                        toggle
                        value={!!checked.title}
                        label='Title'
                        onChange={onChecked}
                    />
                    <Checkbox
                        name='author'
                        toggle
                        value={!!checked.author}
                        label='Author'
                        onChange={onChecked}
                    />
                    <Checkbox
                        name='owner'
                        toggle
                        value={!!checked.owner}
                        label='Owner'
                        onChange={onChecked}
                    />
                    <Checkbox
                        name='desc'
                        toggle
                        value={!!checked.desc}
                        label='Desc'
                        onChange={onChecked}
                    />
                </div>
            </div>
        )
    );
};

NavSearch.propTypes = {
    isSearchable: PropTypes.bool,
};

export default NavSearch;
