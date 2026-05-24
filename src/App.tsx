import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProdeDetails from "./pages/ProdeDetails/ProdeDetails";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-bg-main">
          <Navbar />
          <main className="flex-grow pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prode/:id" element={<ProdeDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
