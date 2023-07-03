import { TaskAlt } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Box flex={1}>
      <TaskAlt color="success" sx={{ width: 200, height: 200 }} />
      <Typography variant="h4">Thanks for making your order!</Typography>
      <Typography>
        Your payment is being processed, and your booking is confirmed!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        View My Bookings
      </Button>
    </Box>
  );
}

export default PaymentSuccess;
