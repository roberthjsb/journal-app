import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "./../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoginEmailPassword,
  startGoogleLogin,
} from "./../../actions/auth";

export const LoginScreen = () => {
  
  const {loading} = useSelector(state=> state.ui);
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "roberth@gmail.com",
    password: "123456",
  });
  const { email, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };
  const handleGoogleLogin = () => {
    loading || dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
        />
        <button 
          className="btn btn-primary btn-block" 
          type="submit" 
          disabled={ loading }
        >
          Login
          { 
          loading &&
          <div class="lds-ripple"><div></div><div></div></div>
          }

        </button>
        <div className="auth__social-networks">
          <p>Login with Social Networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
