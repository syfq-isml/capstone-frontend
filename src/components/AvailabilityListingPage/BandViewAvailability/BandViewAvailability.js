import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { formatDate, formatDateDisplay } from "../../utils/formatDate";

const BandViewAvailability = () => {
  const navigate = useNavigate();
  const { bandId } = useParams();
  const [timeslots, setTimeslots] = useState([]);
  const [band, setBand] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  const getAvail = async () => {
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

  useEffect(() => {
    const getBandInfo = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/bands/${bandId}`)
        .then((res) => {
          console.log("Band res.data: ", res.data);
          setBand(res.data);
        });
    };
    getBandInfo();
    getAvail();
  }, []);

  const handleBack = () => {
    navigate("/admin-availability");
  };

  const handleDelete = (timeslotId) => {
    const deleteAvail = async () => {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/avail/${timeslotId}/band/${bandId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          getAvail();
        });
    };
    deleteAvail();
  };

  const handleSubmit = () => {
    const submitAvail = async () => {
      await axios
        .post(
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
        )
        .then((res) => {
          getAvail();
        });
    };
    submitAvail();
  };

  const handleStartDateChange = (date) => {
    setStartDate(formatDate(date));
  };

  const handleEndDateChange = (date) => {
    setEndDate(formatDate(date));
  };

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
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              key={timeslot.id}
            >
              <Typography>
                <b>Id: </b>
                {timeslot.id}
                <b> Start: </b>
                {formatDateDisplay(timeslot.startBlockedTiming)}
                <b> End: </b>
                {formatDateDisplay(timeslot.endBlockedTiming)}
              </Typography>
              <Button
                sx={{ minHeight: 0, minWidth: "2em", padding: 0 }}
                onClick={() => {
                  handleDelete(timeslot.id);
                }}
              >
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
              <DateTimePicker
                onChange={handleStartDateChange}
                format="d/M/y H:m"
              />
            </LocalizationProvider>
          </Box>

          <Box>
            <Typography>
              <b>End: </b>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                onChange={handleEndDateChange}
                format="d/M/y H:m"
              />
            </LocalizationProvider>
          </Box>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to All Availability Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default BandViewAvailability;
