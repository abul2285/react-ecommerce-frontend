import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { authTypes } from '../redux/types';
import Header from '../components/nav/Header';
import { auth } from '../firebase';
import Login from './auth/Login';
import Register from './auth/Register';
import CompleteRegistation from './auth/RegisterComplete';
import Home from './Home';
import ForgotPassword from './auth/ForgotPassword';
import { currentUser } from '../functions/auth';
import UserRoute from '../components/routes/UserRoute';
import History from './user/History';
import UpdatePassword from './user/UpdatePassword';
import AdminRoute from '../components/routes/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import CategoryCreate from './admin/category/CategoryCreate';
import CategoryUpdate from './admin/category/CategoryUpdate';
import SubCreate from './admin/sub/SubCreate';
import SubUpdate from './admin/sub/SubUpdate';
import ProductCreate from './admin/product/ProductCreate';
import AllProducts from './admin/product/AllProducts';
import ProductUpdate from './admin/product/ProductUpdate';
import Product from './Product';
import CategoryHome from './category/CategoryHome';
import SubHome from './sub/SubHome';
import Shop from './Shop';
import Cart from './Cart';
import SideDrawer from '../components/drawer/SideDrawer';
import Checkout from './Checkout';
import CouponCreate from './admin/coupon/CouponCreate';
import Payment from './Payment';
import WishList from './user/WishList';

const Pages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch({
        type: authTypes.LOG_IN.REQUEST,
      });
      if (user) {
        const { token } = await user.getIdTokenResult();
        currentUser(token)
          .then(({ data }) => {
            dispatch({
              type: authTypes.LOG_IN.SUCCESS,
              payload: {
                _id: data._id,
                name: data.name,
                email: user.email,
                role: data.role,
                token,
              },
            });
          })
          .catch((err) => console.log(err));
      } else {
        dispatch({
          type: authTypes.LOG_IN.FAILURE,
          payload: 'user not found',
        });
      }
    });
  }, [dispatch]);
  return (
    <>
      <Header />
      <SideDrawer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <Route
          exact
          path='/register/complete'
          component={CompleteRegistation}
        />
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={UpdatePassword} />
        <UserRoute exact path='/user/wishlist' component={WishList} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate} />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute exact path='/admin/coupon' component={CouponCreate} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />
        <UserRoute exact path='/cart' component={Cart} />
        <UserRoute exact path='/payment' component={Payment} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <AdminRoute
          exact
          path='/admin/product/:slug'
          component={ProductUpdate}
        />
      </Switch>
    </>
  );
};

export default Pages;
