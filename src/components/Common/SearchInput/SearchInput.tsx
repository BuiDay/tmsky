import React from 'react';
import { Input } from 'antd';
import './SearchInput.css'

const { Search } = Input;
 
const SearchInput = () => {
    return (
        <div>
             <Search placeholder="input search text" enterButton="Search" size="large" />
        </div>
    );
};

export default SearchInput;