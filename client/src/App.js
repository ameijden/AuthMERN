import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/App.css';
import ContributionsPage from "./Views/ContributionsPage"
import ContributionResponse from "./Views/ContributionResponse"
import MainPage from "./Views/MainPage"
import Navbar from "./Components/Navbar"
// import Test from './Components/test'
import Page503 from './Views/Page503';
import Page404 from './Views/Page404';
import ContributorsPage from './Views/ContributorsPage';
import AboutPage from './Views/AboutPage';
import ContactPage from './Views/ContactPage';

function App() {
  return (
    <div className="h-screen flex flex-col w-full">
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/contributions" component={ContributionsPage} />
        <Route exact path="/contributions/success" component={ContributionResponse} />
        <Route exact path="/contributors" component={ContributorsPage} />
        <Route exact path="/about-us" component={AboutPage} />
        <Route exact path="/contact-us" component={ContactPage} />
        <Route exact path="/503" component={Page503} />
        <Route exact path="/*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
