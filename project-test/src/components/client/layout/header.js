import { Link, NavLink, useNavigate } from "react-router-dom";
import "./../style/header.css";
import { useState } from "react";
import Modal_Search from "./modal_search";
function Header() {
    const navigate = useNavigate();
    const [searchView, setSearchView] = useState(false);
    const toggleSearchView = () => {
        setSearchView(!searchView);
    };
    window.scrollTo(0, 0);
    return (
        <header>
            <div className="headers container">
                <div className="header-logo d-flex align-items-center">
                    <Link to={"/"} className="icon">
                        <img src="/data/logo/scart-mid.png" alt="logo" width={120} height={60} />
                    </Link>
                </div>
                <div className="header-link">
                    <Link to={"/"}>home</Link>
                    <Link to={"/category"}>categories</Link>
                    <Link to={"/shop"}>shop</Link>
                    <Link to={"/blog"}>blogs</Link>
                </div>
                <div className="header-icon">
                    <div>
                        <button onClick={toggleSearchView}><i className="bi bi-search"></i></button>
                    </div>
                    <div>
                        <button><NavLink to={'/cart'}><i className="bi bi-cart3"></i></NavLink></button>
                        <div className="qty">12</div>
                    </div>
                </div>

            </div>
            {searchView && <Modal_Search onClose={toggleSearchView} />}
        </header >
    );
}
export default Header;