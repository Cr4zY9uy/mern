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
import { useState } from "react";

function EditProduct() {
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
                <Form {...formItemLayout} style={{ maxWidth: 600 }}>
                    <Form.Item
                        label="Name"
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category"
                        hasFeedback
                        validateStatus="">
                        <Select allowClear>
                            <Option value="1" style={{ height: 50 }}>Option 1</Option>
                            <Option value="2" style={{ height: 50 }}>Option 2</Option>
                            <Option value="3" style={{ height: 50 }}>Option 3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        hasFeedback
                        help="Maximum 200 characters"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Quantity"
                        hasFeedback
                        validateStatus="">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="radio-button"
                        label="Hot status"
                        hasFeedback
                    >
                        <Radio.Group name="radiogroup " style={{ height: 50 }} className="d-flex align-items-center">
                            <Radio value={1}>On</Radio>
                            <Radio value={2} checked>Off</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Description"
                        validateStatus=""
                        hasFeedback help="Maximum 300 characters">
                        <Input.TextArea allowClear />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose an image"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture" className="d-flex align-items-center">
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