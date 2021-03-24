import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

const CategoryList = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className='display-4 text-center p-2 my-3 jumbotron'>{title}</div>
      <div className='container'>
        <div className='row'>
          {loading ? (
            <h4 className='text-danger'>loading</h4>
          ) : (
            <Categories categories={categories} />
          )}
        </div>
      </div>
    </>
  );
};

const Categories = ({ categories }) =>
  categories.map((c) => (
    <div
      className='col btn btn-outlined-primary btn-block btn-lg btn-raised m-3'
      key={c._id}>
      <Link to={`/category/${c.slug}`}>{c.name}</Link>
    </div>
  ));

export default CategoryList;
