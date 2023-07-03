import { Typography, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { formatDateCard } from "../../utils/formatDate";
import ClientBandStatusTable from "./ClientBandStatusTable";
import BookingsDetailCard from "../../BookingsDetailCard/BookingsDetailCard";

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
    status,
  } = state;
  console.log(state);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
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
        <Typography my={2} variant="h5" m={0}>
          {formatDateCard(startDateTime)} - {formatDateCard(endDateTime)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Event Details:</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }} my={1}>
          <BookingsDetailCard title={"Booking Id"} content={id} />
          <BookingsDetailCard title={"Status"} content={status} />
          <BookingsDetailCard title={"Venue"} content={venue} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ClientBandStatusTable bands={bands} />
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography>
            Contact me if all musicians are unavailable:{" "}
            {isContactMe ? "✅" : "❌"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default ClientViewBooking;
