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

const ClientViewBooking = () => {
  const { state } = useLocation();
  const {
    id,
    startDateTime,
    endDateTime,
    venue,
    eventName,
    bands,
    isContactMe,
  } = state;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Grid>
      <Box>
        <Typography my={2} variant="h4">
          {eventName}
        </Typography>
      </Box>
      <Typography>Booking Id: {id}</Typography>
      <Typography>Start: {startDateTime}</Typography>
      <Typography>End: {endDateTime}</Typography>
      <Typography>Venue: {venue}</Typography>
      <Box>
        <Typography variant="h5">Bands:</Typography>
        {bands.map((band) => {
          return (
            <Box>
              <Typography>
                {band.bandBooking.rank}.{band.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Typography>
        Contact me if unable to get my chosen musicians:{" "}
        {isContactMe.toString()}
      </Typography>
      <Button onClick={handleBack}>Back to Dashboard</Button>
    </Grid>
  );
};

export default ClientViewBooking;
