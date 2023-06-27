import { useEffect, useState } from "react";
import { Typography, Stack, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminBookingCard from "./AdminBookingCard/AdminBookingCard";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/bookings/all`)
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
        });
    };
    getBookings();
  }, []);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h4" my={1} sx={{ textAlign: "center" }}>
        All Bookings Dashboard
      </Typography>
      <Box my={1}>
        {!bookings.length && (
          <Box>
            <Typography className="client-dashboard-emoji">😪</Typography>
            <Typography>All users have no bookings.</Typography>
          </Box>
        )}
      </Box>
      <Box mb={3}>
        {bookings.map((booking) => {
          return <AdminBookingCard key={booking.eventName} props={booking} />;
        })}
      </Box>
    </Stack>
  );
};

export default AdminDashboard;
