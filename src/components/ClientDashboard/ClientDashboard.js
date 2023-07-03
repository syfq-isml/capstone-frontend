import { useEffect, useState } from "react";
import { Typography, Stack, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingCard from "./BookingCard/BookingCard";

const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  // useEffect block to check if user is logged in or not:
  useEffect(() => {
    const checkIfAccessTokenIsValid = async () => {
      try {
        const checkAccessToken = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (checkAccessToken.data.msg === "Valid Token") {
          return;
        }
      } catch (error) {
        console.error(
          "Error occurred while checking if user was logged in",
          error
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        navigate("/homepage");
      }
    };
    if (accessToken) {
      checkIfAccessTokenIsValid();
    } else navigate("/homepage");
  }, [accessToken, navigate]);

  useEffect(() => {
    const getBookings = async () => {
      const currentBookings = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/bookings/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBookings(currentBookings.data);
    };
    getBookings();
  }, [accessToken]);

  const handleNavigateToNewBookingPage = () => {
    navigate("/makenewbooking");
  };
  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h4" my={1} sx={{ textAlign: "center" }}>
        Bookings Dashboard
      </Typography>
      <Box my={1}>
        {!bookings.length && (
          <Box>
            <Typography sx={{ fontSize: "10em" }}>😪</Typography>
            <Typography>You currently have no bookings.</Typography>
          </Box>
        )}
      </Box>
      <Box mb={3} width="100%">
        <Grid container>
          {bookings.map((booking) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={booking.eventName}>
                <BookingCard key={booking.eventName} props={booking} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Button variant="contained" onClick={handleNavigateToNewBookingPage}>
        + Create New Booking
      </Button>
    </Stack>
  );
};

export default ClientDashboard;
