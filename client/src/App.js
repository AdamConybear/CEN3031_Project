import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Week from "./views/week/weekDash"


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/Home" component={Home} />
        <Route path="/Week" exact component={Week} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
