import React, { useContext } from 'react';
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext, VehicleContext } from '../../App';
import "./Navigation.css";

const Navigation = () => {
  const [user, setUser] = useContext(UserContext);
  const [vehicle, setVehicle] = useContext(VehicleContext);

  if (user.is)
    console.log(user);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/home"><NavbarBrand>City Riders</NavbarBrand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto my-nav">
          <Link to="/home">Home</Link>
          <Link to={`/destination/${vehicle.id}`}>Destination</Link>
          {
            user.isSignedIn ?
              <Link onClick={() => setUser({})} to="/">{user.email || user.displayName}</Link>
              : <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </React.Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;