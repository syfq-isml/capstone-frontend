import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import BandStatusTable from "./BandStatusTable/BandStatusTable";

import { formatDateDisplay } from "../../utils/formatDate";
import axios from "axios";

const AdminViewBooking = () => {
  const { state } = useLocation();
  const {
    id,
    startDateTime,
    endDateTime,
    venue,
    eventName,
    bands,
    isContactMe,
    status,
  } = state;

  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin-dashboard");
  };

  const [tempBody, setTempBody] = useState({});

  useEffect(() => {
    const tempBandObj = {};
    bands.map((band) => {
      tempBandObj[band.bandBooking.id] = band.bandBooking.status;
    });
    setTempBody(tempBandObj);
  }, [bands]);

  useEffect(() => {
    console.log("temp: ", tempBody);
  }, [tempBody]);

  const handleSubmit = () => {
    // convert tempBody to postBody with required format
    const postBody = {};
    let i = 1;
    Object.entries(tempBody).map((band) => {
      postBody[`bandBooking${i}Id`] = band[0];
      postBody[`band${i}Status`] = band[1];
      i++;
    });
    const submitBody = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/bandbookings/booking/${id}`,
          postBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {});
    };
    submitBody();
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography my={2} variant="h4">
            {eventName}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Event Details:</Typography>
        <Box>
          <Typography>
            <b>Status: </b>
            {status}
          </Typography>
          <Typography>
            <b>Booking Id:</b> {id}
          </Typography>
          <Typography>
            <b>Start: </b>
            {formatDateDisplay(startDateTime)}
          </Typography>
          <Typography>
            <b>End: </b>
            {formatDateDisplay(endDateTime)}
          </Typography>
          <Typography>
            <b>Venue: </b>
            {venue}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box xs={12} sm={6}>
          <Typography variant="h5">Bands:</Typography>
          <BandStatusTable bands={bands} setTempBody={setTempBody} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography>
            Contact me if all musicians are unavailable:{" "}
            {isContactMe ? "🗸" : "X"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit} variant="contained">
          Submit Status Change
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleBack}>Back to Dashboard</Button>
      </Grid>
    </Grid>
  );
};

export default AdminViewBooking;
