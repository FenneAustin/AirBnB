import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage({closeModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Email
        <input
          className="email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          className="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          className="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="sign-up-button">
        Sign Up
      </button>
    </form>
  );
}

export default SignupFormPage;