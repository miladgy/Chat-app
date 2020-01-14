import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={LandingPage} />
        <Route path="/chat" component={Chat} />
      </BrowserRouter>
    </div>
  );
}

export default App;
