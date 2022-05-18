import React from "react";
import NewBooks from "./component/books/NewBooks";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="app-container">
        <NewBooks />
      </div>
    </div>
  );
};

export default App;
