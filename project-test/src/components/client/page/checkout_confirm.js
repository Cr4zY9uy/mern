import "../style/checkout_confirm.css";
import { Breadcrumb, Table, Col, Row, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
function Checkout_Confirm() {
    const navigate = useNavigate();
    return (
        <div className="checkout_confirm_page container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/checkout_confirm'}>CHECKOUT PAGE</NavLink>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><img src='./data/fruits/apple1.png' alt='apple' width={50} height={50} />Mark</td>
                        <td>60$</td>
                        <td>
                            10
                        </td>
                        <td>100$</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><img src='./data/fruits/apple2.png' alt='apple' width={50} height={50} />Jacob</td>
                        <td>60$</td>
                        <td>
                            10
                        </td>
                        <td>100$</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><img src='./data/fruits/apple3.png' alt='apple' width={50} height={50} />Larry the Bird</td>
                        <td>60$</td>
                        <td>
                            10
                        </td>
                        <td>100$</td>
                    </tr>
                </tbody>
            </Table>
            <div className="items pt-5">
                <h1><i class="bi bi-truck"></i>Shipping address</h1>
                <div className="info">
                    <div className="row wrap_bill d-flex justify-content-between">
                        <div className="col-6">
                            <Table bordered responsive >
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>
                                            asd aasd
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Phone
                                        </th>
                                        <td>82911</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Email
                                        </th>
                                        <td>82911</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Address
                                        </th>
                                        <td> jaksd asdas</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Note
                                        </th>
                                        <td> sadasdasd asdas</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-6 cost" >
                            <Table bordered responsive >
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>
                                            10$
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Tax
                                        </th>
                                        <td>100$</td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Shipping
                                        </th>
                                        <td>100$</td>
                                    </tr>
                                    <tr>

                                        <th>
                                            Total
                                        </th>
                                        <th>100$</th>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-credit-card-2-back-fill"></i>PAYMENT METHOD:</th>
                                        <td>COD</td>
                                    </tr>
                                </tbody>

                            </Table>
                            <div className='wrap_btn'>
                                <Button variant='secondary' onClick={() => { navigate("/cart") }}>
                                    back to cart
                                </Button>
                                <Button variant='warning' onClick={() => { navigate("/order_success") }}>
                                    confirm
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Checkout_Confirm;