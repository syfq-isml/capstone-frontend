import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path ="/" element={<NavBar />}> */}

            <Route path="/" element={<HomePage />} />

            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
