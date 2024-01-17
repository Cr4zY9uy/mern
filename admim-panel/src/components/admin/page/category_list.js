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
function Category_List() {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const myImage = cld.image('shop/xpnsepyssnwwueukiq6x');
    myImage.resize(fill().width(250).height(250));
    const navigate = useNavigate();
    return (
        <div className="container category_list">
            <h2 className='caption'><MenuUnfoldOutlined style={{ paddingRight: "6px" }} />Category list</h2>
            <Table bordered hover responsive="lg">

                <thead>

                    <tr>
                        <th colSpan={2} className='wrap_delete'>
                            <div className='d-flex'>
                                <div className='wrap' onClick={checkParent}>
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent' /></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger'><i class="bi bi-trash-fill"></i></Button>
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
                        <th>Sort</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td>
                            <AdvancedImage cldImg={myImage} />
                        </td>
                        <td>1</td>
                        <td>Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. </td>
                        <td>
                            <Button variant='danger' style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning' onClick={() => { navigate("/category/edit") }}><FormOutlined /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td><img src='./images/fruits/apple1.png' alt='apple' /></td>
                        <td>1</td>
                        <td>Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. </td>
                        <td>
                            <Button variant='danger' style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning'><i class="bi bi-pencil-square"></i></Button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td><img src='./images/fruits/apple1.png' alt='apple' /></td>
                        <td>1</td>
                        <td>Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. </td>
                        <td>
                            <Button variant='danger' style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning'><FormOutlined onClick={() => { navigate('/category/edit') }} /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td><img src='./images/fruits/apple1.png' alt='apple' /></td>
                        <td>1</td>
                        <td>Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. </td>
                        <td>
                            <Button variant='danger' style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning'><i class="bi bi-pencil-square"></i></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
export default Category_List;