import React from "react";
import "../style/404notfound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="cont-404">
            <img src="/images/404.svg" alt="svg" />
            <Link to={"/admin"}><button >Back to Home</button></Link>
        </div>
    );
};

export default PageNotFound;