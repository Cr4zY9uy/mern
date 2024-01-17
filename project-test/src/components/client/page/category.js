import { Pagination } from "antd";
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/category.css";
import Banner_Big from "../layout/banner_big";
function Category() {
    return (
        <div className="category">
            <Banner_Big />
            <div className="container category_page d-flex flex-column align-items-center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={'/category'}>CATEGORY</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="category_pagination"><p className=" text-left">Showing <b>1</b> - <b>10</b> results of <b>20</b> results</p></div>
                <Product_Grid />
                <Product_Grid />
                <Product_Grid />

                <Pagination defaultCurrent={1} total={50} pageSize={9} />
            </div>
        </div>
    );
}
export default Category;