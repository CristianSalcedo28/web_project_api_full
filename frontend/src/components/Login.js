import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin, handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(email, password);
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Log in</h2>
        <input
          className="form__input"
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input"
          id="password-input"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form__submit">Log in</button>
      </form>
      <div className="from__redirection">
        <p>
          Not a member yet?{" "}
          <Link to="/signup" className="from__link">
            Sign up here!
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
