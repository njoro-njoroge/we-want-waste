import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { SkipList } from "./pages/SkipList";

function App() {
  return (
    <Router>
   
        <Navbar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<SkipList />} />
          </Routes>
        </main>
        <Footer />

    </Router>
  );
}

export default App;
