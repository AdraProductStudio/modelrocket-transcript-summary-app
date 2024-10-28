import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'components/Input/InputGroup';
import ButtonComponent from 'components/Button/Button';
import { useSelector } from 'react-redux';
import { useCustomNavigate, useDispatch } from 'components/CustomHooks';
import { handleClearErrors, handleEyeFunction, handleLogin, handleLoginCredentials } from 'Redux/Actions/Common_actions/Common_action';
import SpinnerComponent from 'components/Spinner/Spinner';
import { toast } from 'react-toastify';
import sha256 from 'sha256';

const LoginForm = () => {
    const { usernamee, passwordd, eyeOpen, buttonSpinner, validated, loginErr, token } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const handlSubmitOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        let username = window.atob(usernamee)
        let password = window.atob(passwordd)
        let hashPassword = sha256(password) 
        const basicAuth = "Basic " + btoa(`${username}:${hashPassword}`);

        // let username = "matsuri"
        // let password = "fc153ac36455604c6a6bcb3e22c0a4debfb746d59ad4a33a4b0d50f315206958d78da64e88957993e537e5ef235537a65ac0bc8fbaa725ae3e8e151617e82b81"
        // const basicAuth = "Basic " + btoa(`${username}:${password}`);
        dispatch(handleLogin(basicAuth))
    };

    useEffect(() => {
        if (token && usernamee && passwordd) {
            navigate("/home")
        }

        if (loginErr) {
            toast(loginErr, {
                position: "top-right",
                type: 'error',
                onOpen: () => dispatch(handleClearErrors)
            })
            return
        }
    }, [loginErr, token, dispatch])


    return (
        <Form noValidate validated={validated} className='pb-3'>
            <Row className="mb-3">
                <InputGroup
                    controlId="validationLoginUsername"
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    inputError={"Username required"}
                    change={(e) => dispatch(handleLoginCredentials({ username: e.target.value }))}
                    value={window.atob(usernamee)}
                />

                <InputGroup
                    controlId="validationLoginPassword"
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    inputError={"Password required"}
                    change={(e) => dispatch(handleLoginCredentials({ password: e.target.value }))}
                    keyDown={handlSubmitOnEnter}
                    eyeState={!eyeOpen}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    value={window.atob(passwordd)}
                />
            </Row>

            {/* <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                />
            </Form.Group> */}

            <ButtonComponent
                type="button"
                className="btn-md w-100"
                clickFunction={handleSubmit}
                title="Login"
                buttonName={buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Login"
                }
                btnDisable={buttonSpinner}
            />
        </Form>
    )
}

export default LoginForm