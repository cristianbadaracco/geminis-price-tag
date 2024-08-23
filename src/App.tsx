import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./app/pages/Home";
import Report from "./app/pages/Report";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
