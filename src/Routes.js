import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AppHeader } from './shared-components';
// import { ClimbingBoxLoader } from 'react-spinners';
import Logo from './assets/images/oneload-logo.jpg';
const ProtectedRoutes = lazy(() => import('./config/ProtectedRoutes'));
const Info = lazy(() => import('components/error-pages/NotFound'));
const Telemart = lazy(() => import('components/Telemart'));
const ProductDetail = lazy(() => import('./components/Telemart/ProductDetail'));
const ProductsList = lazy(() => import('./components/Telemart/ProductList'));
const OrderHistory = lazy(() => import('./components/Telemart/OrderHistory'));
const Cart = lazy(() => import('./components/Telemart/Cart'));
const ProductSearch = lazy(() => import('./components/Telemart/SearchProduct'));
const Dashboard = lazy(() => import('./components/Termloan/dashboard'));
const TermsAndConditions = lazy(() => import('./components/Termloan/term-loan'));

const SuspenseLoading = () => {
  return (
    <div className="app-loader">
      <div className="d-flex align-items-center flex-column px-4">
        <img alt="" src={Logo} width="80px" />
      </div>
      <div className="text-muted font-size-xl text-center pt-3">Loading...</div>
    </div>
  );
};

const MainRoutes = () => {
  const HeaderLayout = () => (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
  return (
    <div className="app-wrapper">
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>








          {/* telemart */}
          <Route path="/" >
            <Route path="/telemart" element={<HeaderLayout />}>
              <Route path="home" element={<Telemart />} />
              <Route path="products/:categoryId" element={<ProductsList />} />
              <Route path="productDetail/:categoryId/:productId" element={<ProductDetail />} />
              <Route path="searchProduct" element={<ProductSearch />} />
              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="happy" element={<Info />} />
            </Route>











            {/* termloan */}

            <Route path="/termloan">
              <Route path="home" element={<TermsAndConditions />} />
              <Route path={`dashboard`} element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<Info />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainRoutes;
