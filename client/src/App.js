import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import Week from "./views/week/weekDash";
import CommentBoard from "./views/CommentBoard/CommentBoard";
import Contact from "./views/Contact/Contact";
import WhatIf from "./views/WhatIf/WhatIf";
import Resources from "./views/Resources/Resources";
import AboutUs from "./views/AboutUs/AboutUs";
import Help from "./views/Help/Help";
import { Link } from "react-router-dom";
import AuthHome from "./views/Auth/AuthHome";
import { useAuth0 } from '@auth0/auth0-react';
import "./App.css"; 
import axios from 'axios';


const App = () => {

  const { isAuthenticated , isLoading, user } = useAuth0();
  // const {sub, email} = user;

  const adminEmails = ["test@test.com", "joe@joe.com"];
  

  const addUsertoDB = () => {
    const {sub, email} = user;
    // console.log("hopefully user exists here");
    // console.log(user);

    // if they're already in db dont add them, if not add
    let address;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    //checking if user is an admin
    let role;
    if (adminEmails.includes(email)){
      role = "admin"
    }else{role = "user"}

    const userData = {
      id: sub,
      role: role,
      popups: [],
      assignments: []
    };

    axios
      .post(address + "/api/user/user", userData)
      .then((res) => console.log(res.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

  }

  if(isLoading){
    console.log("hopefully user exists here");
    // console.log(user);
    return null;
  }

  return (
  <html>
    <body>
      <div className = "wrapper">
        <div className = "page-header">
          {isAuthenticated ? <Header /> : null}
        </div>
        <article className="content">
              {isAuthenticated ? addUsertoDB() : null} 
              {isAuthenticated ? 
                <Switch>
                  <Route path="/Home" component={Home} />
                  <Route path="/Week" exact component={Week} />
                  <Route path="/WhatIf" exact component={WhatIf} />
                  <Route path="/Resources" exact component={Resources} />
                  <Route path="/CommentBoard" exact component={CommentBoard} />
                  <Route path="/Contact" exact component={Contact} />
                  <Route path="/AboutUs" exact component={AboutUs} />
                  <Route path="/Help" exact component={Help} />
                  <Route exact path="/">
                    <Redirect to="/Home" />
                  </Route>  
                </Switch>  
                : 
                <Switch>
                  <Route path="/Auth" component={AuthHome}/>
                  <Route path="/" component={AuthHome}/>
                  {/* <Route exact path="/">
                    <Redirect to="/Auth" />
                  </Route> */}
                </Switch>
                }
        </article>
      </div>
        
      <div className="page-footer">
        <div className="footerHeading">
          <Link to="/Contact">Contact</Link>
          <Link to="/AboutUs">About us</Link>
          <Link to="/Help">Help</Link>
        </div>
      </div>

    </body>
  </html>
        
  );
};
export default App;