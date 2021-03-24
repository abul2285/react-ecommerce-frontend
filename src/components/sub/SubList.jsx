import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubList = ({ title }) => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
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
            <Subs categories={subs} />
          )}
        </div>
      </div>
    </>
  );
};

const Subs = ({ categories: subs }) =>
  subs.map((s) => (
    <div
      className='col btn btn-outlined-primary btn-block btn-lg btn-raised m-3'
      key={s._id}>
      <Link to={`/sub/${s.slug}`}>{s.name}</Link>
    </div>
  ));

export default SubList;
