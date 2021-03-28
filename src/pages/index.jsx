import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { authTypes } from '../redux/types';
import { auth } from '../firebase';
import { currentUser } from '../functions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const Header = lazy(() => import('../components/nav/Header'));
const Login = lazy(() => import('./auth/Login'));
const Register = lazy(() => import('./auth/Register'));
const CompleteRegistation = lazy(() => import('./auth/RegisterComplete'));
const Home = lazy(() => import('./Home'));
const ForgotPassword = lazy(() => import('./auth/ForgotPassword'));
const UserRoute = lazy(() => import('../components/routes/UserRoute'));
const History = lazy(() => import('./user/History'));
const UpdatePassword = lazy(() => import('./user/UpdatePassword'));
const AdminRoute = lazy(() => import('../components/routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./admin/product/ProductUpdate'));
const Product = lazy(() => import('./Product'));
const CategoryHome = lazy(() => import('./category/CategoryHome'));
const SubHome = lazy(() => import('./sub/SubHome'));
const Shop = lazy(() => import('./Shop'));
const Cart = lazy(() => import('./Cart'));
const SideDrawer = lazy(() => import('../components/drawer/SideDrawer'));
const Checkout = lazy(() => import('./Checkout'));
const CouponCreate = lazy(() => import('./admin/coupon/CouponCreate'));
const Payment = lazy(() => import('./Payment'));
const WishList = lazy(() => import('./user/WishList'));

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
    <Suspense
      fallback={
        <div className='col text-cerner m-5'>
          __REACT EC
          <LoadingOutlined className='text-success' />
          MMERCE__
        </div>
      }>
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
    </Suspense>
  );
};

export default Pages;
