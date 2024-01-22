import "./../style/editOrder.css";
import {
    UploadOutlined,
    FormOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Select,
    Radio,
    Upload,
    Button,
    Space,
    Flex
} from 'antd';
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Popover_Input from "../layout/popover_input";
import Popover_Select from "../layout/popover_select";
import { detail_order } from "../../../services/order_service";
import { useParams } from "react-router";
function EditOrder() {
    const [input, handleInput] = useState({});
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const load_order = async () => {
        const rs = await detail_order(id);
        setOrder(rs.data.order);
    }
    useEffect(() => {
        load_order();
    }, [])
    return (
        <div className="edit_order_panel container">
            <h2 className='caption'><FormOutlined />Order detail</h2>
            <Card
                title=""
                bordered={false}
            >
                <Form>
                    <Flex justify="space-between" gap="middle">
                        <Table bordered hover size="lg">
                            <tbody>
                                <tr>
                                    <th>First name:</th>
                                    <td>
                                        <Popover_Input info={order.first_name} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Last name:</th>
                                    <td>
                                        <Popover_Input info={order.last_name} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <td>
                                        <Popover_Input info={order.phone} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{order.email}</td>
                                </tr>
                                <tr>
                                    <th>Address:</th>
                                    <td>
                                        <Popover_Input info={order.address} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Country:</th>
                                    <td>
                                        <Popover_Input info={order.country} />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table bordered hover size="lg">
                            <tbody>
                                <tr>
                                    <th>Order status:</th>
                                    <td><Popover_Select /></td>
                                </tr>
                                <tr>
                                    <td>Shipping status:</td>
                                    <td><Popover_Select /></td>
                                </tr>
                                <tr>
                                    <td>Payment status:</td>
                                    <td><Popover_Select /></td>
                                </tr>
                                <tr>
                                    <td>Shipping method:</td>
                                    <td><Popover_Select /></td>
                                </tr>
                                <tr>
                                    <td>Payment method:</td>
                                    <td><Popover_Select /></td>
                                </tr>
                                <tr>
                                    <td>Create at:</td>
                                    <td>2024-01-11 16:09:39</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Flex>
                    <Table bordered hover size="lg" className="products">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th >Price</th>
                                <th >Quantity</th>
                                <th >Total price</th>
                                <th >Tax</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Thanh long</td>
                                <td>
                                    <Popover_Input />
                                </td>
                                <td>
                                    <Popover_Input />
                                </td>
                                <td>100</td>
                                <td>
                                    <Popover_Input />
                                </td>                                <td>
                                    <Button type="primary" danger style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={7}>
                                    <Flex gap="small" wrap="wrap">
                                        <Button style={{ backgroundColor: "rgb(25, 135, 84)", color: "rgb(255,255,255)" }}><i class="bi bi-plus-lg"></i></Button>
                                        <Button style={{ backgroundColor: "rgb(255, 193, 7)", color: "rgb(255,255,255)" }}><i class="bi bi-floppy2"></i></Button>
                                    </Flex>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Flex justify="space-between" gap="middle">
                        <Table bordered hover className="money">
                            <tbody>
                                <tr>
                                    <td>SubTotal:</td>
                                    <td>109</td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>Shipping Standard:</td>
                                    <td>
                                        <Popover_Input info={order.shipping_cost} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Coupon/Discount</td>
                                    <td>
                                        <Popover_Input info={order?.coupon}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Other fee:</td>
                                    <td>
                                        <Popover_Input info={order.shipping_cost}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Total:</th>
                                    <td>20.9</td>
                                </tr>
                                <tr>
                                    <td>Received(-):</td>
                                    <td>
                                        <Popover_Input />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Balance:</th>
                                    <td>20.9</td>
                                </tr>

                            </tbody>
                        </Table>
                        <Table bordered hover size="sm" style={{ minHeight: "40px", maxHeight: "40px" }}>
                            <tbody>
                                <tr>
                                    <th>Note:</th>
                                    <td>
                                        <Popover_Input />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Flex>
                </Form>
            </Card>
        </div >
    );
}
export default EditOrder;