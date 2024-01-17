import "./../style/copyright.css"
import { Footer } from "antd/es/layout/layout";
function Copyright() {
    return (
        <Footer style={{ textAlign: 'center' }} className="wrap-copyright">
                <div>
                    © 2024  S-Cart : An organic fruits store.  All rights reserved
                </div>
                <div>
                    Power by Anh Nguyen
                </div>
                <div>
                    Link Github
                </div>
        </Footer>
    );
}
export default Copyright;