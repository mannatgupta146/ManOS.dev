import React from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Desktop from "./components/windows/Desktop";

const App = () => {
  return (
    <main>
      <Nav />
      <Desktop />
    </main>
  );
};

export default App;
