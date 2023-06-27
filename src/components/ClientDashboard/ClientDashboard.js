import { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const myBookings = [];
  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h4" my={1} sx={{ textAlign: "center" }}>
        Bookings Dashboard
      </Typography>
      <Typography my={2}>
        {!myBookings.length && (
          <div>
            <div className="client-dashboard-emoji">😪</div>
            <div>You currently have no bookings.</div>
          </div>
        )}
      </Typography>
      <Button variant="contained">+ Create New Booking</Button>
    </Stack>
  );
};

export default ClientDashboard;
