import React from 'react'
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <>
        <h3 className="auth__title">Login</h3>
        <form action="">
        <input
            className="auth__input"
            type="text"
            name="nombre"
            placeholder="Nombre"
            autoComplete="off"
          />
          <input
            className="auth__input"
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            className="auth__input"
            type="password"
            name="confirmacion"
            placeholder="Confirmación"
          />
          <button 
          className="btn btn-primary btn-block mb-5"
            type="submit">Register</button>          
          <Link 
            to="/auth/login"
            className="link"
          >
              Already registered?
          </Link>
        </form>
      </>
    )
}
