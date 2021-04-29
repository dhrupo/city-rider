import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import Register from './components/Register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Vehicle from './components/Vehicle/Vehicle';

export const UserContext = createContext();
export const VehicleContext = createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    fetch("fakeData.json")
      .then(res => res.json())
      .then(data => {
        setVehicle(data);
      })
      .catch(err => console.log(err))
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <VehicleContext.Provider value={[vehicle, setVehicle]}>
        <Router>
          <Navigation></Navigation>
          <Container>
            <Switch>
              <Route exact path="/">
                <Vehicle></Vehicle>
              </Route>
              <Route path="/home">
                <Vehicle></Vehicle>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/destination/:vId">
                <Destination></Destination>
              </PrivateRoute>
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route path="*">
                <NoMatch></NoMatch>
              </Route>
            </Switch>
          </Container>
        </Router>
      </VehicleContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
