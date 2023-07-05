import { Typography, Button, Grid, Box, TextField } from "@mui/material";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TimingsTable from "./TimingsTable";

const BandViewAvailability = () => {
  const navigate = useNavigate();
  const { bandId } = useParams();
  const [timeslots, setTimeslots] = useState([]);
  const [band, setBand] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const getAvail = async () => {
    const availInfo = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/avail/band/${bandId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setTimeslots(availInfo.data);
  };

  useEffect(() => {
    const getBandInfo = async () => {
      const bandInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/bands/${bandId}`
      );
      setBand(bandInfo.data);
    };
    getBandInfo();
    getAvail();
  }, []);

  const handleBack = () => {
    navigate("/admin-availability");
  };

  const handleDelete = (timeslotId) => {
    const deleteAvail = async () => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/avail/${timeslotId}/band/${bandId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Blocked Timing Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      getAvail();
    };
    deleteAvail();
  };

  const handleSubmit = () => {
    const submitAvail = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/avail/band/${bandId}`,
          {
            startBlockedTiming: new Date(startDate),
            endBlockedTiming: new Date(endDate),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Blocked Timing Added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      getAvail();
    };
    submitAvail();
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" my={2}>
          {band.name} Availability
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" my={2}>
          Add Blocked Timing
        </Typography>

        <Box>
          <Grid>
            <TextField
              autoComplete="off"
              required
              value={startDate}
              size="small"
              id="startDateTimeInput"
              type="datetime-local"
              label="Start Date & Time"
              InputLabelProps={{ shrink: true }}
              onChange={handleStartDateChange}
            />
            <Typography>-</Typography>
            <TextField
              autoComplete="off"
              required
              value={endDate}
              size="small"
              id="endDateTimeInput"
              type="datetime-local"
              label="End Date & Time"
              InputLabelProps={{ shrink: true }}
              onChange={handleEndDateChange}
            />
          </Grid>

          <Box m={2}>
            <Button onClick={handleSubmit} variant="contained">
              Submit New Blocked Timing
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" my={2}>
          Blocked Timings
        </Typography>
        <TimingsTable timeslots={timeslots} handleDelete={handleDelete} />
      </Grid>

      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to All Availability Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default BandViewAvailability;
