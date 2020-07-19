import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useForm } from "./../../hooks/useForm";
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from './../../actions/ui';
import { registerWithEmailAndPassword } from './../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const {msgError} = useSelector(state=> state.ui);

  const [formValues, handleChange] = useForm({
    name: "Roberth J",
    email: "roberth.salazar@outlook.com",
    password: 123456,
    confirmationpass: 123456,
  });
  const { name, email, password, confirmationpass } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(registerWithEmailAndPassword(email , password ,name));
    }
  };

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      dispatch(setError("Name is require"))
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"))
      return false;
    } else if(password !== confirmationpass || password.length < 5) {
      dispatch(setError("Password should ve at least 6 characters and match password with confirmation"))
      return false;
    }else{
      dispatch(removeError())
      return true
    }
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleRegister}>
         {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Nombre"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          name="confirmacion"
          placeholder="Confirmación"
          value={confirmationpass}
          onChange={handleChange}
        />
        <button 
          className="btn btn-primary btn-block mb-5" 
          type="submit"
        >
          Register
        </button>
        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
