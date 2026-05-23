import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ProdeDetails from "./pages/ProdeDetails/ProdeDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prode/:id" element={<ProdeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
