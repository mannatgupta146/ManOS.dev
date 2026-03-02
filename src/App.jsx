import React from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Desktop from "./components/windows/Desktop";
import NotificationCenter from "./components/NotificationCenter";

const App = () => {
  return (
    <main>
      <NotificationCenter />  
      <Nav />
      <Desktop />
    </main>
  );
};

export default App;