import { Table, Button, Breadcrumb, CloseButton } from 'react-bootstrap';
import "./../style/cart.css";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function Cart() {
    const [quantity, setQuantity] = useState(10);
    const minus = () => {
        // Update the quantity state, ensuring it doesn't go below 0
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        if (quantity === 0) setQuantity(0)
    };
    const plus = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    return (
        <div className='container cart_page'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <NavLink to={'/'}>HOME</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    <NavLink to={'/cart'}>CART</NavLink>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><img src='./data/fruits/apple1.png' alt='apple' width={50} height={50} />Mark</td>
                        <td>60$</td>
                        <td>
                            <div className='form-group d-flex align-items-center justify-content-around'>
                                <i class="bi bi-dash-lg" name={1} onClick={minus}></i>
                                <input value={quantity} id={1} className="form-control quantity" style={{ textAlign: "center" }} />
                                <i class="bi bi-plus-lg" name={1} onClick={plus}></i>
                            </div>
                        </td>
                        <td>100$</td>
                        <td><CloseButton></CloseButton></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><img src='./data/fruits/apple2.png' alt='apple' width={50} height={50} />Jacob</td>
                        <td>60$</td>
                        <td>
                            <div className='form-group d-flex align-items-center justify-content-around'>
                                <i class="bi bi-dash-lg"></i>
                                <input value={10} className="form-control quantity" style={{ textAlign: "center" }} />
                                <i class="bi bi-plus-lg"></i>
                            </div>
                        </td>
                        <td>100$</td>
                        <td><CloseButton></CloseButton></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><img src='./data/fruits/apple3.png' alt='apple' width={50} height={50} />Larry the Bird</td>
                        <td>60$</td>
                        <td> <div className='form-group d-flex align-items-center justify-content-around'>
                            <i class="bi bi-dash-lg"></i>
                            <input value={10} className="form-control quantity" style={{ textAlign: "center" }} />
                            <i class="bi bi-plus-lg"></i>
                        </div></td>
                        <td>100$</td>
                        <td><i className="bi bi-x-lg"></i></td>
                    </tr>
                </tbody>
            </Table>
            <div className='wrap_btn'>
                <Button variant='warning'>
                    Checkout
                </Button>
            </div>
        </div>
    );
}
export default Cart;