import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/client/page/home';
import Search from './components/client/page/search';
import Shop from './components/client/page/shop';
import Cart from './components/client/page/cart';
import Header from './components/client/layout/header';
import Footer from './components/client/layout/footer';
import Copyright from './components/client/layout/copyright';
import ProductDetail from './components/client/page/product_detail';
import Checkout from './components/client/page/checkout';
import Checkout_Confirm from './components/client/page/checkout_confirm';
import Order_Success from './components/client/page/order_success';
import Blog_Page from './components/client/page/blog';
import Category from './components/client/page/category';
import ScrollToTop from 'react-scroll-to-top';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:option/:input' element={<Search />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout_confirm' element={<Checkout_Confirm />} />
        <Route path='/order_success' element={<Order_Success />} />
        <Route path='/blog' element={<Blog_Page />} />
        <Route path='/category' element={<Category />} />
      </Routes>
      <ScrollToTop smooth />
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
