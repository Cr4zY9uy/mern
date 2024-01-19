import { useState } from "react";
import "./../style/login.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { login } from "../../../services/user_service";
import USER_ACTION from "../../../redux/user/user_action";
import { connect } from "react-redux";
function Login(props) {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const hanldeInput = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    const hanldeLogin = async (e) => {
        e.preventDefault();
        try {
            const rs = await login(info);
            if (rs.status !== 200) {
                alert("Login fail! Retry")
            }
            else {
                props.login(rs.data)
                navigate("/admin");
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className="login_wrap d-flex justify-content-center align-items-center">
            <div className="login_panel">
                <div className="wrap_logo d-flex justify-content-center align-items-center"><img src="/images/icon/scart-mid.png" alt="logo" /></div>
                <h2>Login to the system</h2>
                <div className="wrap_input">
                    <form onSubmit={hanldeLogin}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Username" name="username" onChange={hanldeInput} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" name="password" onChange={hanldeInput} />
                        </FloatingLabel>
                        <div className="d-flex justify-content-center">
                            <Button size="lg" variant="primary" type="submit">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: rs => { dispatch({ type: USER_ACTION.LOGIN, payload: rs }) }
    }
}
export default connect(null, mapDispatchToProps)(Login);