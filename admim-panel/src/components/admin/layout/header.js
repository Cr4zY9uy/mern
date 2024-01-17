import "./../style/header.css";
import { useState } from "react";
import { Button } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
function Header() {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="header">
            <div className="d-flex justify-content-between align-items-center" style={{ height: "10vh" }}>
                <Button
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                    }}
                >   {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div className="d-flex align-items-center icon_wrap ">
                    <div className="home"><i className="bi bi-house-door-fill"></i></div>
                    <div className="wrap_admin d-flex justity-content-center align-items-center"><img src="./images/icon/admin.png" alt="logo" /></div>
                </div>
            </div>
        </div>
    );
}
export default Header;