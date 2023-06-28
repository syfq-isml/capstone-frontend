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

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
  const [timeslots, setTimeslots] = useState([]);
  const [band, setBand] = useState({});

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
          setTimeslots(res.data);
        });
    };
    const getBandInfo = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/bands/${bandId}`)
        .then((res) => {
          console.log("Band res.data: ", res.data);
          setBand(res.data);
        });
    };
    getBandInfo();
    getBookings();
  }, []);

  const handleBack = () => {
    navigate("/admin-availability");
  };

  console.log(AdapterDateFns);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" my={2}>
          {band.name} Availability
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" my={2}>
          Blocked Timings
        </Typography>
        {timeslots.map((timeslot) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>
                <b>Start: </b>
                {timeslot.startBlockedTiming}
                <b> End: </b>
                {timeslot.endBlockedTiming}
              </Typography>
              <Button sx={{ minHeight: 0, minWidth: "2em", padding: 0 }}>
                🗑️
              </Button>
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h5" my={2}>
            Add Blocked Timing
          </Typography>
          <Box>
            <Typography>
              <b>Start: </b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker />
            </LocalizationProvider>
          </Box>
          <Box>
            <Typography>
              <b>End: </b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker />
            </LocalizationProvider>
          </Box>
          <Button>Submit</Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to All Availability Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default BandViewAvailability;
