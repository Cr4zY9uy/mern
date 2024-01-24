import "./../style/addCategory.css";
import {
    PlusOutlined,
    UploadOutlined
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import {
    Form,
    Input,
    Upload,
    Button,
    Space
} from 'antd';
import { Store } from 'react-notifications-component';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { add_category } from "../../../services/category_service";
function AddCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
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

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async () => {
        try {
            const res = await add_category({ ...data, image });
            if (res.status === 201) {
                Store.addNotification({
                    title: "Sucess!!",
                    message: "You add a category successfully!",
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
                    message: "You add a category unsuccessfully!",
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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    return (
        <div className="add_category_panel container">
            <h2 className='caption'><PlusOutlined />Add new category</h2>
            <Card
                title="Create a new category"
                bordered={false}
            >
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item
                        label="Category ID"
                        hasFeedback
                        validateDebounce={1500}
                        name="category_id"
                        rules={[
                            {
                                required: true
                            },
                            {
                                min: 4,
                                message: "Minimum 4 character"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character"
                            }
                        ]}
                    >
                        <Input name="category_id" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        hasFeedback
                        validateDebounce={1500}
                        rules={[
                            {
                                required: true
                            },
                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character"
                            }
                        ]}
                    >
                        <Input name="name" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item label="Description"
                        name="description"
                        validateDebounce={1500}
                        rules={[
                            {
                                min: 5,
                                message: "Minimum 5 character"
                            },
                            {
                                max: 300,
                                message: "Maximum 300 character"
                            }
                        ]}
                        hasFeedback >
                        <Input.TextArea allowClear name="description" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="image"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose an image"
                        rules={[
                            {
                                required: true,
                                message: "Input that field"
                            }
                        ]}
                    >
                        <Upload name="image" listType="picture" className="d-flex align-items-center" beforeUpload={file => handleImage(file)}
                        >
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
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
}
export default AddCategory;