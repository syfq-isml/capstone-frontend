import { HighlightOff, TaskAlt } from "@mui/icons-material";
import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentError() {
  const navigate = useNavigate();

  return (
    <Box flex={1} py={7}>
      <HighlightOff
        sx={{ width: 150, height: 150 }}
        color="error"
      ></HighlightOff>
      <Typography variant="h4">You have cancelled your transaction.</Typography>
      <Typography>
        That's okay, feel free to make the payment anytime!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 3 }}>
        View My Bookings
      </Button>
    </Box>
  );
}

export default PaymentError;
