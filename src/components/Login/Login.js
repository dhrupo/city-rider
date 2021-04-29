import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from '../../App';
import {
  Link,
  useHistory,
  useLocation
} from 'react-router-dom';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: ""
  });

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useContext(UserContext);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email, password, rememberMe } = data;
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const newLoggedInUser = { ...data };
          newLoggedInUser.error = "";
          newLoggedInUser.isSignedIn = true;
          setLoggedInUser(newLoggedInUser);
          setUser(newLoggedInUser);
          history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
          const newLoggedInUser = { ...loggedInUser };
          newLoggedInUser.error = errorMessage;
          newLoggedInUser.isSignedIn = false;
          setLoggedInUser(newLoggedInUser);
        });
    }
  }

  const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newLoggedInUser = { ...result.user };
        newLoggedInUser.error = "";
        newLoggedInUser.isSignedIn = true;
        setLoggedInUser(newLoggedInUser);
        setUser(newLoggedInUser);
        history.replace(from);
      }).catch((error) => {
        var errorMessage = error.message;
        const newLoggedInUser = { ...loggedInUser };
        newLoggedInUser.error = errorMessage;
        newLoggedInUser.isSignedIn = false;
        setLoggedInUser(newLoggedInUser);
      });
  }

  const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const newLoggedInUser = { ...result.user };
        newLoggedInUser.error = "";
        newLoggedInUser.isSignedIn = true;
        setLoggedInUser(newLoggedInUser);
        setUser(newLoggedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        const newLoggedInUser = { ...loggedInUser };
        newLoggedInUser.error = errorMessage;
        newLoggedInUser.isSignedIn = false;
        setLoggedInUser(newLoggedInUser);
      });
  }

  return (
    <div className="form-login">
      <h4>Login</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Control className="mb-2" name="email" type="text" placeholder="Email" ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
        {errors.email && errors.email.type === "required" && <span className="text-danger">Email is required</span>}
        {errors.email && errors.email.type === "pattern" && <span className="text-danger">Not a valid email</span>}

        <Form.Control className="mb-2" name="password" type="password" placeholder="Password" ref={register({ required: true })} />
        {errors.password && errors.password.type === "required" && <span className="text-danger">Password is required.</span>}

        <Row className="text-center">
          <Col lg={6} key="checkbox" className="mb-2">
            <Form.Check
              name="rememberMe"
              type="checkbox"
              label="Remember Me"
              id="checkbox"
              ref={register}
            />
          </Col>
          <Col lg={6}>
            <a href="/#">Forget Password</a>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Log in</Button>
      </Form>
      {loggedInUser.error && <span className="text-center text-danger">{loggedInUser.error}</span>}
      {loggedInUser.isSignedIn && <span className="text-center text-success">user logged in successfully</span>}

      <p className="text-center mt-2">Don't have an account? <Link to="/register">Create an account</Link></p>
      <hr className="hr" />

      <div>
        <Button variant="outline-primary mb-2" onClick={handleGoogleSignIn}>Continue with Google</Button>
        <Button variant="outline-primary" onClick={handleFbSignIn}>Continue with Facebook</Button>
      </div>

    </div>

  );
};

export default Login;