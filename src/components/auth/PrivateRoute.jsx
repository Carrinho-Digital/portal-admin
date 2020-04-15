import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import CookieUtil from '../../util/cookie';



const PrivateRoute = ({ children, ...rest }) => {
    const authenticated = CookieUtil.get()

    return <Route {...rest} render={({ location }) => (
        authenticated
            ? children
            : <Redirect to={{ pathname: "/login", state: { from: location } }} />
    )} />
}

export default PrivateRoute