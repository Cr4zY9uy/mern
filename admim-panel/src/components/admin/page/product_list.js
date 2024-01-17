import Table from 'react-bootstrap/Table';
import "./../style/product_list.css";
import { FormOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { useNavigate } from 'react-router';
function Product_List() {
    const navigate = useNavigate();
    return (
        <div className="container product_list">
            <h2 className='caption'><MenuUnfoldOutlined />Product list</h2>
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
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Thanh long</td>
                        <td><img src='./images/fruits/apple1.png' alt='apple' /></td>
                        <td>@mdo</td>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <Button variant='danger' style={{ marginRight: "10px" }}><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning' onClick={() => { navigate('/product/edit') }}><FormOutlined /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>THanh long ruot do</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>1</td>
                        <td>Mark</td>
                        <td><div className='product_hot'>HOT</div></td>
                        <td>@mdo</td>
                        <td></td>
                    </tr>

                </tbody>
            </Table>
        </div>
    );
}
export default Product_List;