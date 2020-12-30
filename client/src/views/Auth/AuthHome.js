import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import "./Auth.css";
// import Login from './Login';

const AuthHome = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className ="auth-container">
            <h1 style={{fontSize: "40px"}}>Welcome to Gator Rater!</h1>
            <div class="statement">We want to provide a platform for students to feel cared about. To achieve this, students should have the tools at their fingertips to be successful at UF while maintaining their well-being.</div>
            {/* <div class="statement">To continue to site, please log in or register</div> */}
            <div class="statement">If you would like to only view the site, feel free to login as a guest user and use the credentials below. Otherwise, please log in or register.</div>
            <div class="credentials-1"><strong>Email: </strong> guest@guest.com</div>
            <div class="credentials-2"><strong>Password: </strong> Guest123#</div>
            {/* <Login/>*/}
            {/* <button onClick={() => loginWithRedirect()}>
                Entry
            </button> */}

            <div className="entryButton" onClick={() => loginWithRedirect()}>Enter</div>
        </div>
    );

}

export default AuthHome;
