import { Typography, Button, Grid, Box } from "@mui/material";

import { useEffect, useState } from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { formatDate } from "../../utils/formatDate";
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
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/avail/${timeslotId}/band/${bandId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getAvail();
    };
    deleteAvail();
  };

  const handleSubmit = () => {
    const submitAvail = async () => {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/avail/band/${bandId}`,
        {
          startBlockedTiming: startDate,
          endBlockedTiming: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getAvail();
    };
    try {
      submitAvail();
      toast.success("Timeslot added!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      toast.error(`Error: ${e.response.data.msg}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(formatDate(date));
  };

  const handleEndDateChange = (date) => {
    setEndDate(formatDate(date));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" my={2}>
          {band.name} Availability
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" my={2}>
            Add Blocked Timing
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box mx={1} sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography mx={1}>
                  <b>Start: </b>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    onChange={handleStartDateChange}
                    format="d/M/y H:m"
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box mx={1} sx={{ display: "flex" }}>
              <Box mx={1} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <b>End: </b>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    onChange={handleEndDateChange}
                    format="d/M/y H:m"
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
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
