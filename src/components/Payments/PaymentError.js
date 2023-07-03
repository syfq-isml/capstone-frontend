import { TaskAlt } from "@mui/icons-material";
import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentError() {
  const navigate = useNavigate();

  return (
    <Box flex={1}>
      <Typography variant="h1">😞</Typography>
      <Typography variant="h4">Why'd you cancel man.....</Typography>
      <Typography>Bro.... dont anyhow cancel la.... aiyo...</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        View My Bookings
      </Button>
    </Box>
  );
}

export default PaymentError;
