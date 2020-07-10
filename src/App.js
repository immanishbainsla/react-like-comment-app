import React from "react";
import "./App.css";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="row d-flex justify-content-center p-4">
      <div className="col-md-8 border rounded p-2">
        <MainComponent />
      </div>
    </div>
  );
}

export default App;
