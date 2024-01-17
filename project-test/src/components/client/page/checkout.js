import "../style/checkout.css";
import { Breadcrumb, Table, Col, Row, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Checkout() {
    const changeActivePayment = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.payment').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedPayment = clickedOption.getAttribute('data-value');
        console.log(selectedPayment);
    }
    const changeActiveShipping = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.shipping').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedShipping = clickedOption.getAttribute('data-value');
        console.log(selectedShipping);
    }
    return (
        <div className="checkout_page container">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/checkout'}>CHECKOUT</NavLink>
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
                <div className="info">
                    <div className="row wrap_bill d-flex justify-content-between">
                        <Form className='bill col-6'>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Col>
                                        <Form.Label><i class="bi bi-person-fill"></i>First name</Form.Label>
                                        <Form.Control type="text" name='first_name' required minLength={6} />
                                    </Col>
                                    <Col>
                                        <Form.Label><i class="bi bi-person-fill"></i>Last name</Form.Label>
                                        <Form.Control type="text" name='last_name' required minLength={6} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Row>
                                    <Col>
                                        <Form.Label><i class="bi bi-telephone-fill"></i>Phone</Form.Label>
                                        <Form.Control type="text" name='phone' required pattern='[0-9]{10}' />
                                    </Col>
                                    <Col>
                                        <Form.Label><i class="bi bi-envelope-fill"></i>Email</Form.Label>
                                        <Form.Control type="email" name='email' required />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><i class="bi bi-person-lines-fill"></i>Address</Form.Label>
                                <Form.Control type="text" name='address' required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><i class="bi bi-globe2"></i>Country</Form.Label>
                                <Form.Control type="text" name='country' required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><i class="bi bi-journal-medical"></i>Note</Form.Label>
                                <Form.Control as="textarea" rows={3} name="note" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Payment method</Form.Label>
                                <Row>
                                    <Col name='payment' className='payment active' data-value='Credit card' onClick={(e) => changeActivePayment(e)}>
                                        <div className='credit'><div><i className="bi bi-credit-card-2-back-fill"></i><span>Credit </span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='payment' className='payment' data-value='Paypal' onClick={(e) => changeActivePayment(e)}>
                                        <div className='paypal'><div><i className="bi bi-paypal"></i><span>Paypal</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='payment' className='payment' data-value='COD' onClick={(e) => changeActivePayment(e)}>
                                        <div className='cod'><div><i className="bi bi-wallet-fill"></i><span>COD</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group style={{ paddingTop: "20px" }}>
                                <Form.Label>Shipping method</Form.Label>
                                <Row>
                                    <Col name='shipping' className='shipping active' data-value='Free' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='free '><div><i className="bi bi-envelope-fill"></i><span>Free</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='shipping' className='shipping' data-value='Standard' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='standard  '><div><i className="bi bi-archive-fill"></i><span>Standard</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                    <Col name='shipping' className='shipping' data-value='Express' onClick={(e) => changeActiveShipping(e)}>
                                        <div className='express '><div><i className="bi bi-send-fill"></i><span>Express</span></div><i className="bi bi-check2-circle"></i></div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <div className="col-5" >
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
                                            Total
                                        </th>
                                        <th>100$</th>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='wrap_btn'>
                                <Button variant='warning'>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Checkout;