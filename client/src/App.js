import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Homepage from './pages/Homepage';

// components

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
