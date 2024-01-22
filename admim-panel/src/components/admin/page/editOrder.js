import "./../style/editOrder.css";
import {
    FormOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Select,
    Button,
    Space,
    Flex,
    Divider
} from 'antd';
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { detail_order, edit_order } from "../../../services/order_service";
import { useNavigate, useParams } from "react-router";
import { Store } from "react-notifications-component";
import convertToDate from "../../../functions/convertDate";
function EditOrder() {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const { Option } = Select;
    const [product, setProduct] = useState([]);
    const [form] = Form.useForm();
    const [selection, setSelection] = useState({});
    const load_order = async () => {

        try {
            const rs = await detail_order(id);
            setOrder(rs.data.order);
            setProduct(rs.data.order.products);
            setSelection({
                order_status: rs.data.order.order_status,
                shipping_method: rs.data.order.shipping_cost,
                shipping_status: rs.data.order.shipping_status,
                payment_method: rs.data.order.payment_method,
                payment_status: rs.data.order.payment_status
            })
            setData({
                order_id: rs.data.order.order_id,
                first_name: rs.data.order.first_name,
                last_name: rs.data.order.last_name,
                phone: rs.data.order.phone,
                email: rs.data.order.email,
                address: rs.data.order.address,
                country: rs.data.order.country,
                products: rs.data.order.products,
                shipping_cost: rs.data.order.shipping_cost,
                discount: rs.data.order.discount,
                other_fee: rs.data.order.other_fee,
                received: rs.data.order.received,
                note: rs.data.order.note,
                balanced: rs.data.order.balanced,
                createdAt: rs.data.order.createdAt
            })
            if (rs.status !== 200) {
                console.log(rs.statusText)

            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }

    }
    useEffect(() => {
        load_order();
    }, [])
    const onFinishFailed = (errorInfo) => {
        return errorInfo;
    };
    const handleSelection = (name, value) => {
        setSelection({ ...selection, [name]: value });
    }
    useEffect(() => {
        console.log(selection, data);
    }, [data, selection])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!onFinishFailed) {
            try {
                const res = await edit_order(id, { ...data });
                if (res.status === 200) {
                    Store.addNotification({
                        title: "Sucess!!",
                        message: "You edit an order successfully!",
                        type: "success",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        }
                    });
                    navigate("/category")
                }
                else {
                    Store.addNotification({
                        title: "Failure!!",
                        message: "You edit an order unsuccessfully!",
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true
                        }
                    });
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            Store.addNotification({
                title: "Failure!!",
                message: "You edit an order unsuccessfully!",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
    };
    useEffect(() => {
        if (order) {
            form.setFieldValue("first_name", order.first_name)
            form.setFieldValue("last_name", order.last_name)
            form.setFieldValue("phone", order.phone)
            form.setFieldValue("email", order.email)
            form.setFieldValue("address", order.address)
            form.setFieldValue("country", order.country)
            form.setFieldValue("order_status", order.order_status)
            form.setFieldValue("shipping_status", order.shipping_status)
            form.setFieldValue("payment_status", order.payment_status)
            form.setFieldValue("shipping_method", order.shipping_method)
            form.setFieldValue("payment_method", order.payment_method)
            form.setFieldValue("createdAt", order.createdAt)
            form.setFieldValue("shipping_cost", order.shipping_cost)
            form.setFieldValue("discount", order.discount)
            form.setFieldValue("other_fee", order.other_fee)
            form.setFieldValue("received", order.received)
            form.setFieldValue("balance", order.balance)
            form.setFieldValue("note", order.note)
        }
    }, [order])
    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 30 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    const title = `Edit order ${order.order_id} created at ${convertToDate(order.createdAt)}`;
    return (
        <div className="edit_order_panel container">
            <h2 className='caption'><FormOutlined />Edit order</h2>
            <Card
                title={title}
                bordered={false}
            >
                <Form {...formItemLayout} form={form} style={{ maxWidth: 600 }} onSubmitCapture={handleSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="First name"
                        hasFeedback
                        name="first_name"
                        help="Maximum 200 characters"
                    >
                        <Input name="first_name" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="last_name"
                    >
                        <Input name="last_name" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="phone"
                    >
                        <Input name="phone" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="email"
                    >
                        <Input name="email" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="address"
                    >
                        <Input name="address" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Country"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="country"
                    >
                        <Input name="country" onChange={handleInput} />
                    </Form.Item>
                    <Divider />

                    <Form.Item label="Order status"
                        hasFeedback
                        name="order_status">
                        <Select allowClear name="order_status" onChange={(value) => handleSelection('order_status', value)} >
                            <Option value="New" style={{ height: 50 }}>New</Option>
                            <Option value="Processing" style={{ height: 50 }}>Processing</Option>
                            <Option value="Hold" style={{ height: 50 }}>Hold</Option>
                            <Option value="Canceled" style={{ height: 50 }}>Canceled</Option>
                            <Option value="Done" style={{ height: 50 }}>Done</Option>
                            <Option value="Fail" style={{ height: 50 }}>Fail</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Shipping status"
                        hasFeedback
                        name="shipping_status">
                        <Select allowClear name="shipping_status" onChange={value => handleSelection('shipping_status', value)} >
                            <Option value="Not sent" style={{ height: 50 }}>Not sent</Option>
                            <Option value="Sending" style={{ height: 50 }}>Sending</Option>
                            <Option value="Shipping done" style={{ height: 50 }}>Shipping done</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Payment status"
                        hasFeedback
                        name="payment_status">
                        <Select allowClear name="payment_status" onChange={value => handleSelection('payment_status', value)} >
                            <Option value="Unpaid" style={{ height: 50 }}>Unpaid</Option>
                            <Option value="Partial payment" style={{ height: 50 }}>Partial payment</Option>
                            <Option value="Paid" style={{ height: 50 }}>Paid</Option>
                            <Option value="Return" style={{ height: 50 }}>Return</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Shipping method"
                        hasFeedback
                        name="shipping_method">
                        <Select allowClear name="shipping_method" onChange={value => handleSelection('shipping_method', value)} >
                            <Option value="Free" style={{ height: 50 }}>Free</Option>
                            <Option value="Standard" style={{ height: 50 }}>Standard</Option>
                            <Option value="Express" style={{ height: 50 }}>Express</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Payment method"
                        hasFeedback
                        name="payment_method">
                        <Select allowClear name="payment_method" onChange={value => handleSelection('payment_method', value)} >
                            <Option value="Credit card" style={{ height: 50 }}>Credit card</Option>
                            <Option value="COD" style={{ height: 50 }}>COD</Option>
                            <Option value="Paypal" style={{ height: 50 }}>Paypal</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="discount"
                    >
                        <Input name="discount" type="number" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Shipping cost"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="shipping_cost"
                    >
                        <Input name="shipping_cost" type="number" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Other fee"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="other_fee"
                    >
                        <Input name="other_fee" type="number" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Received(-)"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="received"
                    >
                        <Input name="received" type="number" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Balance"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="balance"
                    >
                        <Input name="balance" type="number" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Note"
                        hasFeedback help="Maximum 300 characters"
                        name="note"
                        validateDebounce={1500}
                        rules={[
                            {
                                min: 5
                            },
                            {
                                max: 300
                            }
                        ]}
                    >
                        <Input.TextArea allowClear onChange={handleInput} name="note" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            offset: 16,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="reset">reset</Button>
                        </Space>
                    </Form.Item>
                    <Table bordered hover responsive="lg">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                                <th>Tax</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>

                </Form>
            </Card>
        </div >
    );
}
export default EditOrder;