import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Adjust the import path as needed
import { ProvideNotion } from "./services/notion";

function App() {
  return (
      <ProvideNotion>
        <Router>
          <AppRoutes />
        </Router>
      </ProvideNotion>
  );
}

export default App;
