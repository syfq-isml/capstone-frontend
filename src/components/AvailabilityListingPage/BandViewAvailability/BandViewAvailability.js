// get the band id as a prop from the BandAvailabilityCard
// make a GET Request to the server for the availability with the band id

import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

const BandViewAvailability = () => {
  const navigate = useNavigate();
  const { bandId } = useParams();
  const [availability, setAvailability] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const getBookings = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/avail/band/${bandId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res.data: ", res.data);
        });
    };
    getBookings();
  }, []);

  const handleBack = () => {
    navigate("/admin-availability");
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Typography>View Band Availability</Typography>
    </Grid>
  );
};

export default BandViewAvailability;
