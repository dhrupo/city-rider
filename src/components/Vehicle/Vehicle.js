import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { VehicleContext } from '../../App';
import "./Vehicle.css";


const Vehicle = () => {
  const [vehicle, setVehicle] = useContext(VehicleContext);

  return (
    <Row className="justify-content-center align-items-center home-card-row">
      {
        vehicle.map(v =>
          <Col key={v.id} lg={3} sm={12} className="my-3 text-center">
            <Link to={`/destination/${v.id}`}>
              <Card className="vehicle-card p-3">
                <Card.Img src={v.image} className="img-fluid" />
                <Card.Body>
                  <Card.Title>{v.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )
      }
    </Row>
  );
};

export default Vehicle;