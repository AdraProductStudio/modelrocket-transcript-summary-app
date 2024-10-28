import React from 'react';
import ButtonComponent from 'components/Button/Button';
import HeaderCard from 'components/Card/HeaderCard';
import { CustomUseLocationHook } from 'components/CustomHooks';

const Header = ({
  offcanvasOn,
  offcanvasOnButton
}) => {
  const customLocation = CustomUseLocationHook();


  const headerContentFunc = () => {
    return <>
      <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
        {customLocation[1]?.charAt(0)?.toUpperCase() + customLocation[1]?.slice(1)}

        {
          offcanvasOn ?
            <div className={`d-inline-block header-icon-tag-width ${offcanvasOn !== '' ? `d-${offcanvasOn}-none` : 'd-none'}`}>
              <ButtonComponent
                type="button"
                clickFunction={offcanvasOnButton}
                buttonName="open"
              />
            </div>
            :
            null
        }
      </div>
    </>
  }

  return (

    <HeaderCard
      cardClassName='w-100 border-0 header-card '
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-4 header-body'
      cardContent={headerContentFunc()}
    />

  )
}

export default Header