import React, { useEffect } from 'react'
import Img from 'components/Img/Img';
import NavLinkComp from 'components/Router_components/NavLink';
import OffCanvas from 'components/Offcanvas/OffCanvas';
import { CustomUseLocationHook } from 'components/CustomHooks';
import { useDispatch, useSelector } from 'react-redux';
import { handleCurrentMenuInd } from 'Redux/Actions/Common_actions/Common_action';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';

const Sidebar = ({
    menuOptions,
    responsiveOn,
    offCanvasShow,
    handleCanvasOpenOrClose,

    header,
    companyLogo,

    footer,
    footerClickFunction
}) => {
    const { currentNavMenuIndex } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const location = CustomUseLocationHook();

    useEffect(() => {
        dispatch(handleCurrentMenuInd(menuOptions, location[location.length - 1]))
    }, [])

    const handleDynamicTab = () => {
        const a = window.location.pathname.split('/')
        const b = a[a.length - 1]

        dispatch(handleCurrentMenuInd(menuOptions, b))
    }

    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {v.icon}
            </div>
            <div className="col text-start">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }

    const headerFun = (width, height, image) => {
        return <Img
            src={image}
            alt='company logo'
            width={width}
            height={height}
        />
    }

    const bodyContent = () => {
        return <nav className='navmenu h-100 w-100'>
            <ul className='h-100 w-100 d-flex flex-wrap justify-content-around'>
                {menuOptions.map((v, i) => (
                    <li className={`list-unstyled w-100 ${i < currentNavMenuIndex ? 'navmenu-active' : ''} ${i === menuOptions.length - 1 ? 'setnavlink-height-zero' : ''}`} key={i}>
                        <div className={`navmenu-icons ${i <= currentNavMenuIndex ? 'navmenu-active' : ''}`}>
                            {Icons.notVisitedIcon}
                        </div>
                        <div onClick={() => handleDynamicTab()}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className=' w-100 d-flex flex-wrap align-items-center mb-2 navlink-sidebar rounded p-2 text-decoration-none'
                                title={hanldeButton(v)}
                                to={v.route}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </nav >
    }
    
    const bodyFun = (ifOffcanvas) => {
        return ifOffcanvas ?
            <div className="row justify-content-center h-100">
                <div className="col-11 h-100">
                    {bodyContent()}
                </div>

                <div className="offcanvas-sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"100%"} height={"100%"} />
                </div>

                <div className="offcanvas-sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"100%"} height={"100%"} />
                </div>

                <div className="offcanvas-sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"100%"} height={"100%"} />
                </div>
            </div>
            :
            bodyContent()
    }

    return (
        <>
            <div className={`sidebar d-none ${responsiveOn !== '' ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid">
                    {/* header */}
                    {
                        header ?
                            <>
                                <div className="sidebar-header position-relative">
                                    <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                                        <div className="col text-center">
                                            {headerFun('198px', '33px', companyLogo)}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }

                    {/* body */}
                    <div className="sidebar-body-onboading">
                        {bodyFun()}
                    </div>
                </div>

                <div className="sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"90%"} height={"90%"} />
                </div>
            </div>


            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header"
                offcanvasHeaderTitleClassname="col-11 text-center"
                offcanvasBodyClassname="sidebar-body-without-footer"
                canvasBody={bodyFun("offcanvas")}
            />
        </>
    )
}

export default Sidebar