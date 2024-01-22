import "./../style/editProduct.css";
import {
    UploadOutlined,
    FormOutlined
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
import { Store } from "react-notifications-component";
import { detail_product_code, edit_product } from "../../../services/product_service";
import { useNavigate, useParams } from "react-router";
import { list_category } from "../../../services/category_service";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';

function EditProduct() {
    const { Option } = Select;
    const [form] = Form.useForm();
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
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
    const [category_name, setCategoryName] = useState("");
    const { id } = useParams();
    const [product, setProduct] = useState({});
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
    useEffect(() => {
        console.log({ ...data, image, category_name });
    }, [data])
    const product_detail_code = async () => {
        try {
            const rs = await detail_product_code(id);
            setProduct(rs.data.product);
            if (rs.status !== 200) {
                console.log(rs.statusText)
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
            }
        }

    }
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    useEffect(() => {
        product_detail_code();
    }, [])
    useEffect(() => {
        cate_list();
    }, [])

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await edit_product({ ...data, image, category_name });
            if (res.status === 201) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You edit a product successfully!",
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
                    message: "You edit a product unsuccessfully!",
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
    };

    useEffect(() => {
        if (product) {
            form.setFieldValue("title", product.title);
            form.setFieldValue("category_name", product.category_name);
            form.setFieldValue("price", product.price);
            form.setFieldValue("price_promotion", product.price_promotion);
            form.setFieldValue("description", product.description);
            form.setFieldValue("status", product.status);
            form.setFieldValue("qty", product.qty);
        }
    }, [product])
    console.log(product);
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
        <div className="edit_product_panel container">
            <h2 className='caption'><FormOutlined />Edit</h2>
            <Card
                title=""
                bordered={false}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} form={form} onSubmitCapture={handleSubmit}>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                        name="title"
                    >
                        <Input onChange={handleInput} name="title" />
                    </Form.Item>
                    <Form.Item label="Category"
                        hasFeedback
                        validateStatus=""
                        name="category_name">
                        <Select allowClear name="category_name" onChange={value => setCategoryName(value)} >
                            {category.map((item) => (
                                <Option value={item.name} style={{ height: 50 }}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        hasFeedback
                        help="Maximum 200 characters"
                        name="price"
                    >
                        <Input name="price" type="number" onChange={handleInput} />
                    </Form.Item>

                    <Form.Item label="Quantity"
                        hasFeedback
                        validateStatus=""
                        name="qty">
                        <Input type="number" name="qty" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Hot status"
                        hasFeedback
                        name="status"
                    >
                        <Radio.Group name="status" style={{ height: 50 }} defaultValue={product.status} className="d-flex align-items-center" onChange={handleInput} >
                            <Radio value={1}>On</Radio>
                            <Radio value={2} checked>Off</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Price promotion"
                        hasFeedback
                        validateStatus=""
                        name="price_promotion">
                        <Input type="number" name="price_promotion" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Description"
                        validateStatus=""
                        hasFeedback help="Maximum 300 characters"
                        name="description">
                        <Input.TextArea allowClear name="description" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Initial image" className="imageInitial">
                        <AdvancedImage cldImg={cld.image(product.thumbnail).resize(fill().width(100).height(100))} />
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
export default EditProduct;