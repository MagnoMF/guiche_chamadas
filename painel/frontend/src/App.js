import React from "react";
import PainelChamada from "./pages/PainelChamada";
import TelaChamada from "./pages/TelaChamada";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<TelaChamada />} />
          <Route path="/painel" element={<PainelChamada />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
