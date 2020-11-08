import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Week from "./views/week/weekDash";
import CommentBoard from "./views/CommentBoard/CommentBoard";
import Contact from "./views/Contact/Contact";
import WhatIf from "./views/WhatIf/WhatIf";
import Resources from "./views/Resources/Resources";
import AboutUs from "./views/AboutUs/AboutUs";
import Help from "./views/Help/Help";

const App = () => {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default App;
