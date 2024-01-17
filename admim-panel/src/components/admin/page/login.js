import "./../style/login.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
function Login() {
    return (
        <div className="login_wrap d-flex justify-content-center align-items-center">
            <div className="login_panel">
                <div className="wrap_logo d-flex justify-content-center align-items-center"><img src="./icon/scart-mid.png" alt="logo" /></div>
                <h2>Login to the system</h2>
                <div className="wrap_input">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Username" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-center">
                        <Button size="lg" variant="primary">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;