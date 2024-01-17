import { Tabs } from "antd";
import {
    PlusOutlined,
    MinusOutlined
} from "@ant-design/icons";
import "./../style/product_detail.css";
import { Breadcrumb, Button } from "react-bootstrap";
import Product_LSView from "../layout/product_LSView";
import { NavLink } from "react-router-dom";
import Banner_Big from "../layout/banner_big";
import { useState } from "react";
function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const minus = () => {
        // Update the quantity state, ensuring it doesn't go below 0
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
        if (quantity === 0) setQuantity(0)
    };

    const plus = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    const items = [
        {
            key: '1',
            label: 'Description',
            children: 'Fruits are a diverse group of edible plant products that come in a wide variety of shapes, sizes, colors, and flavors. They are typically fleshy or juicy and contain seeds, although there are exceptions such as bananas. Fruits are not only delicious but also packed with essential nutrients like vitamins, minerals, and fiber. From common fruits like apples, oranges, and strawberries to more exotic ones like dragon fruit, durian, and jackfruit, there is a fruit to suit every taste preference. They can be enjoyed fresh, dried, juiced, or incorporated into a variety of recipes. Whether eaten as a snack, added to salads, or used in desserts, fruits are a nutritious and tasty addition to any diet.',
        }
    ];
    return (
        <div>
            <Banner_Big />
            <div className="product_detail-client container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <NavLink to={'/'}>HOME</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <NavLink to={'/productdetail'}>APPLE 1</NavLink>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="detail d-flex">
                    <div className="img-group d-flex flex-column">
                        <img src="./data/fruits/apple1.png" alt="apple1" />
                        <img src="./data/fruits/apple1.png" alt="apple1" />
                        <img src="./data/fruits/apple1.png" alt="apple1" />
                    </div>
                    <div className="img-product">
                        <img src="./data/fruits/apple1.png" alt="apple1" />
                    </div>
                    <div className="info">
                        <div>
                            <h1>Apple 1</h1>
                            <h5>$60<span className="discount">$100</span></h5>
                            <hr />
                            <p>Stock status: <span className="">In stock</span></p>
                            <p>Category: <span>Apple</span></p>
                            <hr />
                        </div>
                        <div>
                            <div className='form-group d-flex align-items-center justify-content-start'>
                                <input value={quantity} className="form-control quantity" style={{ textAlign: "center" }} />
                                <div className="d-flex flex-column justify-content-between ms-2" style={{ height: "100%", width: "30%" }}>
                                    <Button variant="light" onClick={plus}>
                                        <PlusOutlined />
                                    </Button>
                                    <Button variant="light" onClick={minus}>
                                        <MinusOutlined />
                                    </Button >

                                </div>
                            </div>
                            <Button variant="warning" style={{ width: "37.5%", height: "10vh", marginTop: 15 }}> Add to cart</Button>
                        </div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1" items={items} />
                <Product_LSView />
            </div>
        </div>
    );
}
export default ProductDetail;