import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css'

function LoginForm({closeModal}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [invalidCredentials, setInvalidCredentials] = useState(null)



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setInvalidCredentials(null);

    dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
        if (data && data.message === 'invalid credentials') {setInvalidCredentials(true)}
        else if (data.message !== 'invalid credentials') setInvalidCredentials(false)
      }
    );

    if(errors.length < 1 && invalidCredentials === false ) closeModal();

  };


  return (
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
        {invalidCredentials ? <li>Invalid crednetials</li> : null}
      </ul>

        <lable className="login-title">
          login
        </lable>
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
    </form>
  );
}

export default LoginForm;
