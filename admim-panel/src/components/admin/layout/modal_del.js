import Modal from 'antd/es/modal/Modal';
import '../style/modal_del.css';
import { Store } from 'react-notifications-component';
import { Button } from 'react-bootstrap';
import { delete_category } from '../../../services/category_service';
import { delete_product } from '../../../services/product_service';
import { delete_order } from '../../../services/order_service';
function Delete_Modal(props) {
    const isModalOpen = props.status;
    const id_del = props.id_del;
    const type = props.type_del;
    const handleOk = async () => {
        try {
            let res = {};
            if (type === "category") {
                res = await delete_category(id_del);
            }
            if (type === "product") {
                res = await delete_product(id_del);
            }
            if (type === "order") {
                res = await delete_order(id_del);
            }
            if (res.status === 200) {
                Store.addNotification({
                    title: "Warning!!",
                    message: `You delete a ${type} successfully!`,
                    type: "warning",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1000,
                        onScreen: true
                    }
                });

                props.onDel();
            }
            else {
                Store.addNotification({
                    title: "Failure!!",
                    message: `You delete a ${type} unsuccessfully!`,
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 1000,
                        onScreen: true
                    }
                });
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }
        props.onOk();
    };
    const handleCancel = () => {
        props.onCancel();
    };
    return (
        <Modal open={isModalOpen} closable={false} footer={null} width={500} centered={true} className='deleteModal'>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p className='words'>Do you want to DELETE this item?</p>
                <div>
                    <Button variant='danger' onClick={handleOk}>Delete</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </div>
        </Modal >
    );
}
export default Delete_Modal;