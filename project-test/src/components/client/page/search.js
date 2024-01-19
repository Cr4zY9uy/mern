import { Pagination } from "antd";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import Product_Grid from "../layout/product_grid";
import "./../style/search.css";
import Banner_Big from "../layout/banner_big";
import { useEffect } from "react";
function Search() {
    const { input } = useParams();

    return (
        <div className="search">
            <Banner_Big />
            <div className="container search_page d-flex flex-column align-items-center">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={'/search'}>SEARCH</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="results_pagination"><p className=" text-left">Showing <b>1</b> - <b>10</b> results of <b>20</b> results</p></div>
                <Product_Grid />
                <Product_Grid />
                <Product_Grid />

                <Pagination defaultCurrent={1} total={50} pageSize={9} />
            </div>
        </div>
    );
}
export default Search;