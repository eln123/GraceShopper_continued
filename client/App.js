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
      <div
        style={{
          position: "absolute",
          top: "90%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <p>
          {" "}
          Brought to you by: Ethan Nair, Ryan Scoville, Warren Au, and Yeun Jae
          Chung
        </p>
        <p>
          {" "}
          All images and assets are property of their respective owners. This is
          a project for Fullstack Academy's 2022 June cohort.
        </p>
      </div>
    </div>
  );
};

export default App;
