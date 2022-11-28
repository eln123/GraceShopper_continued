import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="bg-white">
      <div>
        <Navbar />
        <Routes />
      </div>
    </div>
  );
};

export default App;
