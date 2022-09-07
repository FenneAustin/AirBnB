import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
import {useHistory } from 'react-router-dom'

function LoginForm({closeModal}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [invalidCredentials, setInvalidCredentials] = useState(null)

  const history  = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setInvalidCredentials(null);

    dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
        if (data && data.message === "Invalid credentials") {
          setInvalidCredentials(true);
        } else if (data.message !== "Invalid credentials")
          setInvalidCredentials(false);
      })
      .then(() => history.push("/"));

    if(errors.length < 1 && invalidCredentials === false ) closeModal();

  };


  return (
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
        { invalidCredentials ? <li className="invalid-credentials">Invalid crednetials</li> : null}
      </ul>
        <span className="login-title">
          Login
        </span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="username-input"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="password-input-field"
        />
      <button type="submit" className='login-btn'>Log In</button>
      <span >Not yet member? <span>Signup now</span></span>
    </form>
  );
}

export default LoginForm;
