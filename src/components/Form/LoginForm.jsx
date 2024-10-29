import React, { useEffect, useState } from 'react';
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
import { logout, resetLoginForm } from 'Redux/Slices/Common_Slice/Common_slice';

const LoginForm = () => {
    const { usernamee, passwordd, eyeOpen, buttonSpinner, validated, loginErr, token } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const [showError,setShowError]=useState({
        usernameErr : false,
        passwordErr : false
    })
    const [errMessage, setErrorMessage] = useState({
        usernameErr : "",
        passwordErr : ""
    })

    useEffect(()=>{
        dispatch(logout())
    },[])

    const handlSubmitOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

   

    const handleSubmit = () => {
        let username = window.atob(usernamee).trim()
        let password = window.atob(passwordd).trim()
        let hashPassword = sha256(password) 
        const basicAuth = "Basic " + btoa(`${username}:${hashPassword}`);
 
        dispatch(handleLogin(basicAuth))

      
    };

    useEffect(() => {
        if (token && usernamee && passwordd) {
            navigate("/home")
            dispatch(resetLoginForm())

        }

        if (loginErr) {
            toast(loginErr, {
                position: "top-right",
                type: 'error',
                onOpen: () => dispatch(handleClearErrors)
            
            },dispatch(resetLoginForm()))
            return
        }
    }, [loginErr, token, dispatch])


    const handleBlur = (value)=>{
        if(value==="Username"){
            if(usernamee === ""){
                setShowError({
                    ...showError,usernameErr : true
                })
                setErrorMessage({
                    ...errMessage,usernameErr : "username is required"
                })
            }else{
                setShowError({
                    ...showError,usernameErr : false

                })
                setErrorMessage({
                    ...errMessage,usernameErr : ""
                })
            }
        }
        
        else if(value==="Password"){
            if(passwordd === ""){
                setShowError({
                    ...showError,passwordErr : true
                })
                setErrorMessage({
                    ...errMessage,passwordErr : "password is required"
                })
            }else{
                setShowError({
                    ...showError,passwordErr : false
                })
                setErrorMessage({
                    ...errMessage,passwordErr : ""
                })
            }
        }

      
    }      

    return (
        <Form noValidate validated={validated} className='pb-3' >
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
                    handleBlur={() => handleBlur("Username")}
                />
                {
                    showError.usernameErr ? <span className="text-danger">{errMessage.usernameErr}</span> : null
                }
           

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
                    handleBlur={() => handleBlur("Password")}
                />
                {
                    showError.passwordErr ? <span className="text-danger">{errMessage.passwordErr}</span> : null
                }
              
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