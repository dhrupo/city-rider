import React, { useContext, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import "./Register.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const Register = () => {
  const [regUser, setRegUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: '',
    suceess: false
  });

  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: ""
  });

  const [user, setUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => {
    const { email, password } = data;
    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // var user = userCredential.user;
          const newRegUser = { ...regUser };
          newRegUser.error = "";
          newRegUser.suceess = true;
          setRegUser(newRegUser);
        })
        .catch((error) => {
          var errorMessage = error.message;
          const newRegUser = { ...regUser };
          newRegUser.error = errorMessage;
          newRegUser.suceess = false;
          setRegUser(newRegUser);
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
    <div className="form-register">
      <h4>Create an account</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Control className="mb-2" name="name" placeholder="Name" ref={register({ required: true, minLength: 6 })} />
        {errors.name && errors.name.type === "required" && <span className="text-danger">Name is required</span>}
        {errors.name && errors.name.type === "minLength" && <span className="text-danger">Username have to be 6 digit or more.</span>}

        <Form.Control className="mb-2" name="email" type="text" placeholder="Email" ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
        {errors.email && errors.email.type === "required" && <span className="text-danger">Email is required</span>}
        {errors.email && errors.email.type === "pattern" && <span className="text-danger">Not a valid email</span>}

        <Form.Control className="mb-2" name="password" type="password" placeholder="Password" ref={register({ required: true, minLength: 6, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i })} />
        {errors.password && errors.password.type === "required" && <span className="text-danger">Password is required</span>}
        {errors.password && errors.password.type === "minLength" && <span className="text-danger">Password have to be 6 digit or more.</span>}
        {errors.password && errors.password.type === "pattern" && <span className="text-danger">Password must contain minimum 6 characters, at least one letter and one number.</span>}

        <Form.Control className="mb-2" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({
          validate: value => value === password.current || "passwords do not match"
        })} />
        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

        <Button variant="primary" type="submit">Create an Account</Button>
      </Form>
      {regUser.error && <span className="text-center text-danger">{regUser.error}</span>}
      {regUser.suceess && <span className="text-center text-success">User account created successfully. Please log in to continue.</span>}
      <p className="text-center mt-2">Already have an account? <Link to="/login">Login</Link></p>
      <hr className="hr" />
      <div>
        <Button variant="outline-primary mb-2" onClick={handleGoogleSignIn}>Continue with Google</Button>
        <Button variant="outline-primary" onClick={handleFbSignIn}>Continue with Facebook</Button>
      </div>
    </div>

  );
};

export default Register;