import ButtonComponent from 'components/Button/Button'
import Img from 'components/Img/Img'
import React from 'react'
import { Card } from 'react-bootstrap'
import Image from 'Utils/Image'

const HomeCard = ({
    componentFrom,
    cardClassName,
    cardTitleClassName,
    cardTitle,
    cardBodyClassName,
    cardTextClassName,
    cardParagraphText,
    clickFunction
}) => {
    return (
        <Card className={cardClassName} >
            <Card.Body className={cardBodyClassName}>
                <Card.Title className={cardTitleClassName}>
                    {cardTitle}
                </Card.Title>

                <div className="home-content-image-bg mb-4 w-100">
                    <Img src={Image.photoEmpty} />
                </div>

                <Card.Text className={cardTextClassName} onClick={clickFunction}>
                    {cardParagraphText}
                </Card.Text>

                <ButtonComponent
                    title="Edit"
                    buttonName="Edit"
                    className="w-100"
                />
            </Card.Body>
        </Card>
    )
}

export default HomeCard