import ButtonComponent from 'components/Button/Button'
import { useDispatch } from 'components/CustomHooks'
import Img from 'components/Img/Img'
import React from 'react'
import { useSelector } from 'react-redux'
import { handleLogout } from 'Redux/Actions/Common_actions/Common_action'
import Image from 'Utils/Image'

const MainPagesHeader = () => {
  const commonState = useSelector((state) => state.commonState)
  const dispatch = useDispatch();

  return (
    <div className="model-rocket-header d-flex justify-content-between align-items-center p-3 px-5 ">
      <div className="header-logo ">
        <Img
          src={Image.companyLogoBlack}
          alt="modelrocket-logo"
        />
      </div>
      <div className="header-button">
        <ButtonComponent
          buttonName="Logout"
          className="btn btn-dark btn-sm d-flex rounded p-2 px-4"
          clickFunction={() => dispatch(handleLogout())}
        />
      </div>
    </div>
  )
}

export default MainPagesHeader