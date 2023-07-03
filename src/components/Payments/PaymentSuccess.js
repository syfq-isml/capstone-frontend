import { TaskAlt } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Box flex={1} py={7}>
      <TaskAlt color="success" sx={{ width: 150, height: 150 }} />
      <Typography variant="h4">Thanks for booking with us!</Typography>
      <Typography>
        Your payment is being processed, and your booking is confirmed!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ my: 3 }}>
        View My Bookings
      </Button>
    </Box>
  );
}

export default PaymentSuccess;
