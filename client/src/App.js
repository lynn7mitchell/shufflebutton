import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Homepage from './pages/Homepage';
import Join from './pages/Join'

// components
import SocketTest from './components/SocketTest';

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
