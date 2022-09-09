import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Tarjeta({ bird }) {
    return (
        <Card style={{ width: "18rem" }}>
            <div className='divCardTitle' title={bird.name.spanish}>{bird.name.spanish}</div>
            <Card.Img variant="top" src={bird.images.thumb} />
        </Card>
    )
}
