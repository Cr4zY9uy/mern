import Table from 'react-bootstrap/Table';
import "./../style/order_list.css";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { delete_order_all, list_order } from '../../../services/order_service';
import Delete_Modal from '../layout/modal_del';
import convertToDate from '../../../functions/convertDate';
function Order_List() {
    document.title = "Order list";
    const [type, setType] = useState("");
    const [delID, setDelID] = useState("");
    const [order, setOrder] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [delStatus, setDelStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cate_list = async () => {
        try {
            const rs = await list_order(page);
            setOrder(rs.data.order_list);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }
    }
    const delete_all = async () => {
        const res = await delete_order_all();
        if (res.status === 200) {
            Store.addNotification({
                title: "Sucess!!",
                message: "You delete all orders successfully!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            });
        }
        else {
            Store.addNotification({
                title: "Failure!!",
                message: "You delete all orders unsuccessfully!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            });
        }
    }
    useEffect(() => {
        cate_list();
        setType("order");
        console.log(order);
    }, [delStatus])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleModalOk = () => {
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    const onDelete = () => {
        setDelStatus(true);
    }
    return (
        <div className="container order_list">
            <h2 className='caption'>
                <MenuUnfoldOutlined />
                Order list</h2>
            <Table bordered hover>

                <thead>

                    <tr>
                        <th colSpan={2} className='wrap_delete'>
                            <div className='d-flex'>
                                <div className='wrap' onClick={checkParent}>
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent' onClick={checkParent} /></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger' onClick={delete_all}><i class="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>SubTotal</th>
                        <th>Shipping</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Create at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item) => (
                        <tr key={item.order_id}>
                            <td><input type='checkbox' className='child' /></td>
                            <td>{item.email}</td>
                            <td>
                                {
                                    item.products.reduce((total, product) => total + product.price * product.quantity, 0)
                                }
                            </td>
                            <td>{item.shipping_cost}$</td>
                            <td>{item.discount}$</td>
                            <td>
                                {item.products[0].tax}$
                            </td>
                            <td>
                                {
                                    item.shipping_cost + item.products.reduce((tax, product) => (1 + product.tax) * product.price * product.quantity, 0)
                                }$
                            </td>
                            <td>{item.order_status}</td>
                            <td>{item.payment_method}</td>
                            <td>{convertToDate(item.createdAt)}</td>
                            <td>
                                <Button variant='danger' style={{ marginRight: "10px" }} onClick={() => {
                                    showModal();
                                    setDelID(item.order_id)
                                }}><i class="bi bi-trash-fill"></i></Button>
                                <Button variant='warning' onClick={() => { navigate(`/order/edit/${item.order_id}`) }}><FormOutlined /></Button>
                            </td>
                        </tr>))
                    }
                </tbody>
            </Table>
            <Delete_Modal status={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} type_del={type} id_del={delID} onDel={onDelete} />
        </div>
    );
}
export default Order_List;