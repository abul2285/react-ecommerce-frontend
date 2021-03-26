import React, { useEffect, useState } from 'react';
import ProductCard from '../components/cards/ProductCard.jsx';
import LoadingCard from '../components/cards/LoadingCard.jsx';
import { Menu, Slider, Checkbox, Tag, Radio } from 'antd';
import {
  getProductsByCount,
  getProductsByFilters,
} from '../functions/product.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { getCategories } from '../functions/category.js';
import { getSubs } from '../functions/sub.js';
import Star from '../components/forms/Star.js';

const { SubMenu } = Menu;
const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { text } = useSelector((state) => state.search);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState();
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState();
  const [color, setColor] = useState();
  const [brand, setBrand] = useState();
  const [shipping, setShipping] = useState();

  const dispatch = useDispatch();

  // load some default product on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  // load product by search
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (!text) {
        loadAllProducts();
      } else {
        loadProductByFilter({ query: text });
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // load product by price range
  useEffect(() => {
    loadProductByFilter({ price });
  }, [ok]);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };
  console.log({ ok });

  const loadProductByFilter = (args) => {
    setLoading(true);
    getProductsByFilters(args).then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  };

  const handleSlider = (val) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setSub();
    setPrice(val);
    setCategoryIds([]);
    setStar();
    setBrand();
    setColor();
    setShipping();
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const onHandleCheck = (e) => {
    console.log({ value: e.target.value });
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar();
    setSub();
    setBrand();
    setColor();
    setShipping();
    let ids = [...categoryIds];
    const idIndex = ids.indexOf(e.target.value);
    if (idIndex === -1) {
      ids.push(e.target.value);
    } else {
      ids.splice(idIndex, 1);
    }
    setCategoryIds(ids);
    loadProductByFilter({ category: ids });
  };

  const showCategories = (categories) =>
    categories.map((c) => (
      <div key={c._id} className='m-4'>
        <Checkbox
          value={c._id}
          onChange={onHandleCheck}
          name='checkbox'
          checked={categoryIds.includes(c._id)}>
          {c.name}
        </Checkbox>
      </div>
    ));

  const onStarClick = (stars) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub();
    setStar(stars);
    setBrand();
    setColor();
    setShipping();
    loadProductByFilter({ stars });
  };

  const showStars = (stars) =>
    stars.map((s) => (
      <div key={s} className='m-4'>
        <Star numberOfStars={s} onStarClick={onStarClick} />
      </div>
    ));

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar();
    setSub(sub);
    setBrand();
    setColor();
    setShipping();
    loadProductByFilter({ sub });
  };

  const showSubs = (subs) => (
    <div
      className=''
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        padding: '4px',
      }}>
      {subs.map((s) => (
        <Tag
          key={s._id}
          style={{ cursor: 'pointer', margin: '2px', color: 'green' }}
          onClick={() => handleSub(s)}>
          {s.name}
        </Tag>
      ))}
    </div>
  );

  const handleBrand = (brand) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar();
    setSub();
    setBrand(brand);
    setColor();
    setShipping();
    loadProductByFilter({ brand });
  };

  const showBrands = (brands) => (
    <div
      className='mx-4'
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '4px',
      }}>
      {brands.map((b) => (
        <Radio
          key={b}
          value={b}
          checked={b === brand}
          onClick={() => handleBrand(b)}>
          {b}
        </Radio>
      ))}
    </div>
  );

  const handleColor = (color) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar();
    setSub();
    setBrand();
    setColor(color);
    setShipping();
    loadProductByFilter({ color });
  };

  const showColors = (colors) => (
    <div
      className='mx-4'
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '4px',
      }}>
      {colors.map((c) => (
        <Radio
          key={c}
          value={c}
          checked={c === color}
          onClick={() => handleColor(c)}>
          {c}
        </Radio>
      ))}
    </div>
  );

  const handleShipping = (shipping) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar();
    setSub();
    setBrand();
    setColor();
    setShipping(shipping);
    loadProductByFilter({ shipping });
  };

  const showShipping = (shippings) => (
    <div
      className='mx-4'
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {shippings.map((s) => (
        <Checkbox
          key={s}
          value={s}
          checked={s === shipping}
          onClick={() => handleShipping(s)}>
          {s}
        </Checkbox>
      ))}
    </div>
  );

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <h4>Search and Filter</h4>
            <hr />
            <Menu
              mode='inline'
              defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}>
              {/* filter by price */}
              <SubMenu
                key='1'
                title={
                  <span className='h6'>
                    <DollarOutlined /> Price
                  </span>
                }>
                <div>
                  <Slider
                    value={price}
                    className='mr-4 ml-4'
                    range
                    max='4999'
                    onChange={handleSlider}
                    tipFormatter={(v) => `$${v}`}
                  />
                </div>
              </SubMenu>
              {/* filter by category */}
              <SubMenu
                key='2'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Categories
                  </span>
                }>
                {showCategories(categories)}
              </SubMenu>
              {/* filter by rating */}
              <SubMenu
                key='3'
                title={
                  <span className='h6'>
                    <StarOutlined /> Star
                  </span>
                }>
                {showStars([5, 4, 3, 2, 1])}
              </SubMenu>
              {/* filter by sub categories */}
              <SubMenu
                key='4'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Sub Categories
                  </span>
                }>
                {showSubs(subs)}
              </SubMenu>
              {/* filter by brands */}
              <SubMenu
                key='5'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Brands
                  </span>
                }>
                {showBrands(brands)}
              </SubMenu>
              {/* filter by colors */}
              <SubMenu
                key='6'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Colors
                  </span>
                }>
                {showColors(colors)}
              </SubMenu>
              {/* filter by shipping */}
              <SubMenu
                key='7'
                title={
                  <span className='h6'>
                    <DownSquareOutlined /> Shipping
                  </span>
                }>
                {showShipping(['Yes', 'No'])}
              </SubMenu>
            </Menu>
          </div>
          <div className='col-md-9'>
            <div className='display-4 text-center p-2 my-3 jumbotron'>
              Products
            </div>
            {loading ? (
              <LoadingCard count={3} />
            ) : (
              <div className='row mb-5'>
                {products.map((product) => (
                  <div className='col-md-4 mt-3' key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
