import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
// import { Redirect } from 'react-router-dom'

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => loginWithRedirect()}>
            Entry
        </button>
    );

}

export default Login;