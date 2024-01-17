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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { add_category } from "../../../services/category_service";
function AddCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [image, setImage] = useState("");
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await add_category({ ...data, image });
            console.log(res);
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
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
            console.log(e.target.result);
            setImage(e.target.result.replace(/(\r\n|\n|\r)/gm, ""));
        };
        console.log(URL.createObjectURL(file));
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
                <Form {...formItemLayout} style={{ maxWidth: 600 }} onSubmitCapture={handleSubmit} encType="multipart/form-data">
                    <Form.Item
                        label="Category ID"
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                    >
                        <Input name="category_id" onChange={handleInput} />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                    >
                        <Input name="name" onChange={handleInput} />
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
                            <Button htmlType="reset">reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    );
}
export default AddCategory;