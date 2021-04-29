import React, { useContext, useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import "./Destination.css";
import { VehicleContext } from '../../App';
import { useParams } from 'react-router';

const Destination = (props) => {
  const [input, setInput] = useState({
    from: "",
    to: "",
    date: "",
    ride: "",
    available: "",
    price: "",
    image: "",
    seat: "",
    success: false
  });

  let { vId } = useParams();
  const [vehicle, setVehicle] = useContext(VehicleContext);
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const newInput = { ...data };
    if (vId === 'undefined') {
      vId = newInput.ride;
    }

    const findVehicle = vehicle.find(v => v.id === vId);
    newInput.ride = findVehicle.name;
    newInput.price = findVehicle.price;
    newInput.available = findVehicle.available;
    newInput.image = findVehicle.image;
    newInput.seat = findVehicle.seat;

    newInput.success = true;
    setInput(newInput);
  }

  return (
    <Row className="destination-div justify-content-between">
      <Col sm={12} lg={3} className="search mx-lg-n2">
        {!input.success ? <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control className="mb-2" name="from" type="text" placeholder="Pick From" ref={register({ required: true })} />
          {errors.from && errors.from.type === "required" && <span className="text-danger">Pick up from is required</span>}
          <Form.Control className="mb-2" name="to" type="text" placeholder="Pick To" ref={register({ required: true })} />
          {errors.to && errors.to.type === "required" && <span className="text-danger">Pick up to is required</span>}
          <Form.Control className="mb-2" name="date" type="date" placeholder="Date" value="2021-03-22"
            min="2021-03-20" max="2021-05-31" ref={register({ required: true })} />
          {errors.date && errors.to.type === "required" && <span className="text-danger">Date is required</span>}
          {vId === 'undefined' && <Form.Control as="select" className="mb-2" name="ride" ref={register({ required: true })}>
            <option value="1">Bike</option>
            <option value="2">Car</option>
            <option value="3">Bus</option>
            <option value="4">Train</option>
          </Form.Control>
          }
          {errors.ride && errors.to.type === "required" && <span className="text-danger">Date is required</span>}
          <Button variant="primary" type="submit">Search</Button>
        </Form> :
          <div>
            <div>
              <div className="bg-primary text-white rounded p-2 mb-2">
                <h6>From: {input.from}</h6>
                <h6>To: {input.to}</h6>
                <h6>Date: {input.date}</h6>
              </div>
              <div className="border bg-light rounded p-2 mb-2">
                <img src={input.image} alt="" height="40" /> &nbsp; &nbsp; {input.ride} &nbsp; &nbsp; {input.seat} &nbsp; ${input.price}
              </div>
              <div className="border bg-light rounded p-2 mb-2">
                <img src={input.image} alt="" height="40" /> &nbsp; &nbsp; {input.ride} &nbsp; &nbsp; {input.seat} &nbsp; ${input.price}
              </div>
              <div className="border bg-light rounded p-2 mb-2">
                <img src={input.image} alt="" height="40" /> &nbsp; &nbsp; {input.ride} &nbsp; &nbsp; {input.seat} &nbsp; ${input.price}
              </div>
            </div>
          </div>
        }
      </Col>
      <Col sm={12} lg={9} className="map">
        <Map google={props.google} zoom={14}>

          <Marker onClick={props.onMarkerClick}
            name={'Current location'} />

          <InfoWindow onClose={props.onInfoWindowClose}>
          </InfoWindow>
        </Map>
      </Col>
    </Row >
  );
};

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC4ZNv0moPJzU2G8NEgOFWDAgbzPA0NR70")
})(Destination);