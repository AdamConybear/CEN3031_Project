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
import "./App.css"; 
const App = () => {
  return (
    <html>
   <body>
    <div class = "wrapper">
      <div class = "page-header">
      <Header />
      </div>
        <article class="content">
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
            <Route component={NotFound} />
          </Switch>
        </article>
        </div>
        
        
      
        <div class="page-footer">
          
          <div class="footerHeading">
          
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