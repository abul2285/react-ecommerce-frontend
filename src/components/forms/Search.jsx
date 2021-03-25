import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.search);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  const onChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  return (
    <form className='form-inline my-3 my-lg-0' onSubmit={onSubmit}>
      <input
        type='search'
        value={text}
        className='form-control mr-sm-2'
        onChange={onChange}
        placeholder='Search'
      />
      <SearchOutlined style={{ cursor: 'pointer' }} onClick={onSubmit} />
    </form>
  );
};

export default Search;
