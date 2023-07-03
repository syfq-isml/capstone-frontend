import { useEffect, useState } from "react";
import { Typography, Stack, Paper, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminBookingCard from "./AdminBookingCard/AdminBookingCard";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

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
        console.log(checkAccessToken.data.msg);
        if (checkAccessToken.data.msg === "Valid Token") {
          return;
        }
      } catch (error) {
        console.log(error.response.data.msg);
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
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res.data: ", res.data);
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
            <Typography className="client-dashboard-emoji">🔒</Typography>
            <Typography>
              You do not have permission to view this page.
            </Typography>
          </Box>
        )}
      </Box>
      <Box mb={3}>
        <Grid container>
          {bookings.map((booking) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={booking.eventName}>
                <AdminBookingCard props={booking} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
};

export default AdminDashboard;
