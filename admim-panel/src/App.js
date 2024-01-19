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
import Product_List from './components/admin/page/product_list';
import Category_List from './components/admin/page/category_list';
import Order_List from './components/admin/page/order_list';
import { useState } from 'react';
import { connect } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component'
function App(props) {
  const location = useLocation();
  const hide = location.pathname === '/';
  const currentUser = props.state.currentUser.name;
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const handleNavbarCollapse = (collapsed) => {
    setNavbarCollapsed(collapsed);
  };

  return (
    <>
      <div className='d-flex'>
        {!hide && <Navbar collapsed={navbarCollapsed} />}
        <div className='d-flex flex-column wrap_main'>
          {!hide && <Header onToggleCollapsed={handleNavbarCollapse} />}
          <ReactNotifications />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/product' element={<Product_List />} />
            <Route path='/category' element={<Category_List />} />
            <Route path='/order/edit/:id' element={<EditOrder />} />
            <Route path='/product/add' element={<AddProduct />} />
            <Route path='/category/add' element={<AddCategory />} />
            <Route path='/product/edit/:id' element={<EditProduct />} />
            <Route path='/category/edit/:id' element={<EditCategory />} />
            <Route path='/order' element={<Order_List />} />
          </Routes>
          {!hide && <Copyright />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.user_reducer
  }
}
export default connect(mapStateToProps, null)(App);