import './App.css';
import Login from './components/admin/page/login';
import { Route, Routes, useLocation } from 'react-router';
import Admin from './components/admin/page/home';
import EditOrder from './components/admin/page/editOrder';
import AddProduct from './components/admin/page/addProduct';
import AddCategory from './components/admin/page/addCategory';
import EditProduct from './components/admin/page/editProduct';
import EditCategory from './components/admin/page/editCategory';
import Header from './components/admin/layout/header';
import Copyright from './components/admin/layout/copyright';
import Navbar from './components/admin/layout/navbar';
import Product_List from './components/admin/page/product_list';
import Category_List from './components/admin/page/category_list';
import Order_List from './components/admin/page/order_list';
function App() {
  const location = useLocation();
  const hide = location.pathname === '/login';
  return (
    <>
      <div className='d-flex'>
        {!hide && <Navbar />}
        <div className='d-flex flex-column wrap_main'>
          {!hide && <Header />}

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Admin />} />
            <Route path='/product' element={<Product_List />} />
            <Route path='/category' element={<Category_List />} />
            <Route path='/order/edit' element={<EditOrder />} />
            <Route path='/product/add' element={<AddProduct />} />
            <Route path='/category/add' element={<AddCategory />} />
            <Route path='/product/edit' element={<EditProduct />} />
            <Route path='/category/edit' element={<EditCategory />} />
            <Route path='/order' element={<Order_List />} />
          </Routes>
          {!hide && <Copyright />}
        </div>
      </div>
    </>
  );
}

export default App;
