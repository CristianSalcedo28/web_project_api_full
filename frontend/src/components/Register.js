import React, { useState } from "react";
import { Link } from "react-router-dom"; 

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign up</h2>
        <input
          className="form__input"
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
//        value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="form__input"
          id="password-input"
          name="password"
          type="password"
          placeholder="Password"
//        value={password}
          onChange={handleChangePassword}
          required
        />
        <button className="form__submit">Sign up</button>
      </form>
      {/* link to login page */}
      <div className="from__redirection">
        <p>
          Already a member?{" "}
          <Link to="/signin" className="from__link">
            Log in here!
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
