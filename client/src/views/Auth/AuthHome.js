import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import "./Auth.css";
// import Login from './Login';

const AuthHome = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className ="auth-container">
            <h1 style={{fontSize: "40px"}}>Welcome to Gator Rater!</h1>
            <div class="statement">We want to provide a platform for students to feel cared about. We want students to have the tools at their fingertips to be successful at UF while maintaining their well-being.</div>
            <div class="statement">To continue to site, please log in or register</div>
            {/* <Login/>*/}
            {/* <button onClick={() => loginWithRedirect()}>
                Entry
            </button> */}

            <div className="entryButton" onClick={() => loginWithRedirect()}>Enter</div>
        </div>
    );

}

export default AuthHome;
