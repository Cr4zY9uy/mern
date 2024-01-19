import Table from 'react-bootstrap/Table';
import "./../style/order_list.css";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import checkParent from '../../../functions/checkboxAll';
import { FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
function Order_List() {
    const navigate = useNavigate();
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
                                    <div className='wrap_parent d-flex align-items-center'><input type='checkbox' className='parent'  onClick={checkParent}/></div>
                                </div>
                                <div className="del">
                                    <Button variant='danger'><i class="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th></th>
                        <th>Name</th>
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
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>1</td>
                        <td>@mdo</td>
                        <td>1</td>
                        <td>
                            <Button variant='danger'><i class="bi bi-trash-fill"></i></Button>
                            <Button variant='warning' onClick={() => { navigate('/order/edit') }}><FormOutlined /></Button>
                        </td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' className='child' /></td>
                        <td>1</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>1</td>
                        <td>@mdo</td>
                        <td><div className='status_cart'>ON</div></td>
                        <td>Mark</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
export default Order_List;