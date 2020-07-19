import React from 'react'
import { Route } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { Redirect } from 'react-router-dom';


const PrivateRoute = ({
    isAuthenticate,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={
                (props) => {
                    return (isAuthenticate) ?
                     (<Component {...props} />) : 
                     (<Redirect to='/auth/login' />)
                }
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticate: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

export default PrivateRoute