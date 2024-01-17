import "../style/order_success.css"
import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Order_Success() {

    return (
        <div className="order_success container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/order_success'}>ORDER SUCCESS</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <h1>ORDER SUCCESS</h1>
            <h1>THANK YOU FOR YOUR PURCHASE!
            </h1>
            <h2>YOUR ORDER #O-UE12L-Y78KK
            </h2>
        </div>
    );
}
export default Order_Success;