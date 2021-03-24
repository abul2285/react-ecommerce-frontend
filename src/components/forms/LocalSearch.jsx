import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className='container pt-4 pb-4'>
      <input
        value={keyword}
        type='search'
        className='form-control mb-4'
        placeholder='filter'
        onChange={handleSearch}
      />
    </div>
  );
};

export default LocalSearch;
