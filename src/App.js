import "./App.css";
import React from "react";
import Display from "./Display";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:city?/:options?" element={<Display />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
