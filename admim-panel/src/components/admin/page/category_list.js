import Table from 'react-bootstrap/Table';
import "./../style/category_list.css";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { useNavigate } from 'react-router';
import { FormOutlined } from '@ant-design/icons';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { delete_category_all, list_category, list_category_paginate } from '../../../services/category_service';
import { useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import Delete_Modal from '../layout/modal_del';
import { Pagination } from 'antd';
function Category_List() {
    document.title = "Category list";

    const [type, setType] = useState("");
    const [delID, setDelID] = useState("");
    const [category, setCategory] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [delStatus, setDelStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cate_list = async () => {
        try {
            const rs = await list_category_paginate(page);
            setCategory(rs.data.category_list);
            setTotalProducts(rs.data.total_product);
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
        const res = await delete_category_all();
        if (res.status === 200) {
            Store.addNotification({
                title: "Warning!!",
                message: "You delete all categories successfully!",
                type: "warning",
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
                message: "You delete all categories unsuccessfully!",
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
        setType("category");
    }, [delStatus, page])
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
    const handleCheckboxChange = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
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
        <>
            <div className="container category_list">
                <h2 className='caption'><MenuUnfoldOutlined style={{ paddingRight: "6px" }} />Category list</h2>
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

                                            onClick={delete_all}
                                        ><i class="bi bi-trash-fill"></i></Button>
                                    </div>
                                </div>
                            </th>
                            <th colSpan={8} className='wrap_insert'>
                                <Button variant='success' onClick={() => { navigate('/category/add') }}><i class="bi bi-plus-lg"></i></Button>
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((item) =>
                        (

                            <tr key={item.category_id}>
                                <td><input type='checkbox' className='child' /></td>
                                <td>{item.category_id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <AdvancedImage cldImg={cld.image(item.image).resize(fill().width(100).height(100))} />
                                </td>
                                <td>{item.description}</td>
                                <td>
                                    <div className='d-flex'>
                                        <Button variant='danger' style={{ marginRight: "10px" }} onClick={() => {
                                            showModal();
                                            setDelID(item.category_id)
                                        }}><i class="bi bi-trash-fill"></i></Button>
                                        <Button variant='warning' onClick={() => { navigate(`/category/edit/${item.category_id}`) }}><FormOutlined /></Button>
                                    </div>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>
                <Pagination
                    total={totalProducts}
                    pageSize={6}
                    current={page}
                    onChange={(page) => setPage(page)} />
            </div >
            <Delete_Modal status={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} type_del={type} id_del={delID} onDel={onDelete} />
        </>
    );
}
export default Category_List;