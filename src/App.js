import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage/HomePage";
import BandListingPage from "./components/BandListingPage/BandListing";
import Navbar from "./components/Navbar/Navbar";
import MakeNewBookingPage from "./components/MakeNewBookingPage/MakeNewBookingPage";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import ClientViewBooking from "./components/ClientDashboard/ClientViewBooking/ClientViewBooking";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          style={{ width: "400px" }}
        />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/makenewbooking" element={<MakeNewBookingPage />} />
            <Route path="/bands" element={<BandListingPage />} />
            <Route path="/booking-request" element={<ClientViewBooking />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
