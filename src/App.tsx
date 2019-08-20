import React from "react";
import "./App.css";
import Layout from "./containers/Layout";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>App Ready</p>
      </header> */}
      <Layout />
    </div>
  );
};

export default App;
