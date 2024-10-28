import LoginForm from 'components/Form/LoginForm'
import Img from 'components/Img/Img'
import React from 'react'
import Image from 'Utils/Image'

const Login = () => {
  return (
    <div className="bg-light">
      <div className="container-fluid">
        <div className="row justify-content-center vh-100 align-items-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
            <div className="card border border-light-subtle rounded-4 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5 py-5">
                <div className="text-center mb-3">
                  <Img
                    src={Image.companyLogoBlack}
                    alt="modelrocket-logo"
                  />
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-5">
                  Sign in to your MR account
                </h2>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login