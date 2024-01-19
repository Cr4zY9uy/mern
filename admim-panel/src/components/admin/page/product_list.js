import Table from 'react-bootstrap/Table';
import "./../style/product_list.css";
import { FormOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { useNavigate } from 'react-router';
import { Cloudinary } from '@cloudinary/url-gen';
import { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import { delete_product_all, paginate_product } from '../../../services/product_service';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import Delete_Modal from '../layout/modal';
function Product_List() {
    const [type, setType] = useState("");
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const cate_list = async () => {
        try {
            const rs = await paginate_product(page);
            setCategory(rs.data.product_list);
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
        const res = await delete_product_all();
        if (res.status === 200) {
            Store.addNotification({
                title: "Sucess!!",
                message: "You delete all products successfully!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            });
        }
        else {
            Store.addNotification({
                title: "Failure!!",
                message: "You delete all products unsuccessfully!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 1500,
                    onScreen: true
                }
            });
        }
    }
    useEffect(() => {
        cate_list();
        setType("category")
    }, [])
    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleModalOk = () => {
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('.child');
        let count = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                count++;
            }
        }
        return !(count === checkboxes.length);
    }

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    return (
        <div className="container product_list">
            <h2 className='caption'><MenuUnfoldOutlined />Product list</h2>
            <Table bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th colSpan={2} className='wrap_delete'>
                            <div className='d-flex'>
                                <div className='wrap' onClick={checkParent}>
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent' onClick={checkParent} /></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger'
                                        disabled={handleCheckboxChange()}
                                        onClick={delete_all}><i class="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </th>
                        <th colSpan={9} className='wrap_insert'>
                            <Button variant='success' onClick={() => { navigate('/product/add') }}><i class="bi bi-plus-lg"></i></Button>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>QTY</th>
                        <th>Description</th>
                        <th>Price Promo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {category?.map((item) => {
                        return (

                            <tr key={item.product_id}>
                                <td><input type='checkbox' className='child' /></td>
                                <td>{item.product_id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <AdvancedImage cldImg={cld.image(item.thumbnail).resize(fill().width(100).height(100))} />
                                </td>
                                <td>{item.category_name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                                <td>{item.price_promotion}</td>
                                <td>{item.status === 1 ? <div className='product_hot'>HOT</div> : ""}</td>
                                <td>
                                    <Button variant='danger' style={{ marginRight: "10px" }} onClick={showModal}><i class="bi bi-trash-fill"></i></Button>
                                    <Button variant='warning' onClick={() => { navigate(`/product/edit/${item.product_id}`) }}><FormOutlined /></Button>
                                </td>
                                <Delete_Modal status={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} type_del={type} id_del={item.product_id} />
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default Product_List;
