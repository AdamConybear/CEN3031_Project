import React from "react";
// import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';

const AuthHome = () => {

    return (
        <div style={{textAlign:'center'}}>
            <h1>Welcome to Gator Rater!</h1>
            <h2>little blurb about what app is</h2>
            <h2>To continue to site, please log in or register</h2>
            <Login/>
        </div>
    );

}

export default AuthHome;