import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage/HomePage";
// import LoginPage from "./components/LoginPage/LoginPage";
// import SignUpPage from "./components/SignUpPage/SignUpPage";

import BandListingPage from "./components/BandListingPage/BandListing";
import Navbar from "./components/Navbar/Navbar";
import MakeNewBookingPage from "./components/MakeNewBookingPage/MakeNewBookingPage";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import ClientViewBooking from "./components/ClientDashboard/ClientViewBooking/ClientViewBooking";

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
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} /> */}
            <Route path="/makenewbooking" element={<MakeNewBookingPage />} />
            <Route path="/bands" element={<BandListingPage />} />
            <Route path="/booking-request" element={<ClientViewBooking />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
