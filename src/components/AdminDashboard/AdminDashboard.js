import { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const allBookings = [];
  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h4" my={1} sx={{ textAlign: "center" }}>
        All Bookings Dashboard
      </Typography>
      <Typography my={2}>
        {!allBookings.length && (
          <div>
            <div className="admin-dashboard-emoji">😪</div>
            <div>Users currently have no bookings.</div>
          </div>
        )}
      </Typography>
    </Stack>
  );
};

export default AdminDashboard;
