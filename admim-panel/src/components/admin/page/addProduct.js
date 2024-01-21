import "./../style/addProduct.css";
import {
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Select,
    Radio,
    Upload,
    Button,
    Space
} from 'antd';
import { useEffect, useState } from "react";
import { add_product } from "../../../services/product_service";
import { useNavigate } from "react-router";
import { Store } from 'react-notifications-component';
import { list_category } from "../../../services/category_service";

function AddProduct() {
    const { Option } = Select;
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
    const [category, setCategory] = useState([]);
    const cate_list = async () => {
        try {
            const rs = await list_category();
            setCategory(rs.data.category_list);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }
    }
    const onFinishFailed = (errorInfo) => {
        return errorInfo;
    };
    useEffect(() => {
        cate_list();
    }, [])
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
    const [category_name, setCategoryName] = useState("");
    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!onFinishFailed) {
            try {
                const res = await add_product({ ...data, image, category_name });
                if (res.status === 201) {
                    Store.addNotification({
                        title: "Sucess!!",
                        message: "You add a product successfully!",
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
                    navigate("/product")
                }
                else {
                    Store.addNotification({
                        title: "Failure!!",
                        message: "You add a product unsuccessfully!",
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
                if (error.response) {
                    console.log(error.response.status);
                }
            }
        }
        else {
            Store.addNotification({
                title: "Failure!!",
                message: "You add a product unsuccessfully!",
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
        console.log({ ...data, image, category_name })
    }, [category_name])
    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div className="add_product_panel container">
            <h2 className='caption'><PlusOutlined />Add new product</h2>
            <Card
                title="Create a new product"
                bordered={false}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onSubmitCapture={handleSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="Product ID"
                        hasFeedback
                        validateStatus=""
                    >
                        <Input name="product_id" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                    >
                        <Input name="title" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Category"
                        hasFeedback
                        validateStatus="">
                        <Select allowClear onChange={value => setCategoryName(value)} >
                            {category.map((item) => (
                                <Option value={item.name} style={{ height: 50 }}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        hasFeedback
                        help="Maximum 200 characters"
                    >
                        <Input name="price" type="number" onChange={handleInput} />
                    </Form.Item>

                    <Form.Item label="Quantity"
                        hasFeedback
                        validateStatus="">
                        <Input type="number" name="qty" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Hot status"
                        hasFeedback
                        name="status"
                        onChange={handleInput}
                    >
                        <Radio.Group style={{ height: 50 }} defaultValue={0} name="status" className="d-flex align-items-center">
                            <Radio value={1}>On</Radio>
                            <Radio value={0} checked>Off</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Price promotion"
                        hasFeedback
                        validateStatus="">
                        <Input type="number" name="price_promotion" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Description"
                        validateStatus=""
                        hasFeedback help="Maximum 300 characters">
                        <Input.TextArea allowClear name="description" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose an image"
                    >
                        <Upload name="image" action="/upload.do" listType="picture" className="d-flex align-items-center" beforeUpload={file => handleImage(file)}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
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
                </Form>
            </Card>
        </div >
    );
}
export default AddProduct;