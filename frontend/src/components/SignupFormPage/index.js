import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignUpForm.css"

function SignupFormPage() {
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
      return dispatch(
        sessionActions.signup({ email, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="sign-up-container">
      <div className="left-half-signup">
        <h1>Explore with friends.</h1>
        <span>
          whether its a driving tour, a cruise or a bus, leaf viewing is a great
          way to spend a fall vacation. Its also big tour business and there are
          many options
        </span>
      </div>

      <div className="right-half-signup">
        <span className="signup-title">Register</span>
        <form onSubmit={handleSubmit} className="sign-up-page">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>

            <input
              className="email-input-signup"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>

            <input
              className="password-input-signup"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>

            <input
              className="confirm-password-input-signup"
              placeholder="confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="sign-up-button-signuppage">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
