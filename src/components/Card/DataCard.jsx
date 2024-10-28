import React from 'react';
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const DataCard = ({
    componentFrom,
    cardClassName,
    cardTitleClassName,
    cardTitle,
    cardBodyClassName,
    cardContentClassName,
    cardBody,
    clickFunction
}) => {

    return (
        <Row className="d-flex flex-wrap justify-content-center align-items-center h-100">
            <Card className={cardClassName} >
                <Card.Body className={cardBodyClassName}>
                    <Card.Title className={cardTitleClassName}>
                        {cardTitle}
                    </Card.Title>

                    <Row className={cardContentClassName}>
                        {cardBody}
                    </Row>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default DataCard