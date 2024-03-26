import PropType from 'prop-types';

import { useState } from 'react';

//import './SearchForm.css';

const SearchForm = ({ setSearchParams, loading }) => {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        setSearchParams(
            new URLSearchParams({
                keyword
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <div>
                <label htmlFor='keyword'>Buscar:</label>
                <input
                    type='text'
                    id='keyword'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <button disabled={loading}>Buscar</button>
        </form>
    );
};

SearchForm.propTypes = {
    setSearchParams: PropType.func.isRequired,
    loading: PropType.bool.isRequired,
};

export default SearchForm;
