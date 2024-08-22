import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./app/pages/Home";
import Report from "./app/pages/Report";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/reports">Reports</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
