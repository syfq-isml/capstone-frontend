import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AdminViewBooking = () => {
  const { state } = useLocation();
  const {
    id,
    startDateTime,
    endDateTime,
    venue,
    eventName,
    bands,
    isContactMe,
    status,
  } = state;
  console.log(state);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin-dashboard");
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography my={2} variant="h4">
            {eventName}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Event Details:</Typography>
        <Box>
          <Typography>
            <b>Status: </b>
            {status}
          </Typography>
          <Typography>
            <b>Booking Id:</b> {id}
          </Typography>
          <Typography>
            <b>Start: </b>
            {startDateTime}
          </Typography>
          <Typography>
            <b>End: </b>
            {endDateTime}
          </Typography>
          <Typography>
            <b>Venue: </b>
            {venue}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box xs={12} sm={6}>
          <Typography variant="h5">Bands:</Typography>
          {bands
            .sort((a, b) => a.bandBooking.rank - b.bandBooking.rank)
            .map((band) => {
              return (
                <Box key={band.name}>
                  <Typography>
                    {band.bandBooking.rank}. <b>{band.name}</b> :{" "}
                    {band.bandBooking.status} || <b>HP:</b> {band.phoneNumber}{" "}
                    || <b>Email:</b> {band.email}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography>
            Contact me if all musicians are unavailable:{" "}
            {isContactMe ? "🗸" : "X"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default AdminViewBooking;
