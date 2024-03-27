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
                <input
                    type='search'
                    id='keyword'
                    placeholder='Search'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <button disabled={loading}>Search</button>
        </form>
    );
};

SearchForm.propTypes = {
    setSearchParams: PropType.func.isRequired,
    loading: PropType.bool.isRequired,
};

export default SearchForm;
