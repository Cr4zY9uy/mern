import './App.css';
import 'react-notifications-component/dist/theme.css'
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
import ProductList from './components/admin/page/product_list';
import CategoryList from './components/admin/page/category_list';
import OrderList from './components/admin/page/order_list';
import { ReactNotifications } from 'react-notifications-component'
import PageNotFound from './components/admin/page/404notfound';
import { AppProvider } from './context/app_context';
import ProtectRouter from './functions/protect_router';
function App() {
  const location = useLocation();
  const hide = location.pathname === '/';
  return (
    <>
      <div className='d-flex'>
        <ReactNotifications />
        <AppProvider>
          {!hide && <Navbar />}
          <div className='d-flex flex-column wrap_main'>
            {!hide && <Header />}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route element={<ProtectRouter />}>
                <Route path='/admin' element={<Admin />} />
                <Route path='/product' element={<ProductList />} />
                <Route path='/category' element={<CategoryList />} />
                <Route path='/order/edit/:id' element={<EditOrder />} />
                <Route path='/product/add' element={<AddProduct />} />
                <Route path='/category/add' element={<AddCategory />} />
                <Route path='/product/edit/:id' element={<EditProduct />} />
                <Route path='/category/edit/:id' element={<EditCategory />} />
                <Route path='/order' element={<OrderList />} />
              </Route>
              <Route path='/*' element={<PageNotFound />} />
            </Routes>
            {!hide && <Copyright />}
          </div>
        </AppProvider>
      </div>
    </>
  );
}

export default App;