import { Typography, Button, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { formatDateCard } from "../../utils/formatDate";
import BandStatusTable from "./BandStatusTable/BandStatusTable";
import BookingsDetailCard from "../../BookingsDetailCard/BookingsDetailCard";

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
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/bandbookings/booking/${id}`,
          postBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        toast.success("Status Changed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (e) {
        toast.error(`Error: ${e.response.data.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    submitBody();
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Typography my={2} variant="h4">
          {eventName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography my={2} variant="h5" m={0}>
          {formatDateCard(startDateTime)} - {formatDateCard(endDateTime)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Event Details:</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }} my={1}>
          <BookingsDetailCard title={"Booking Id"} content={id} />
          <BookingsDetailCard title={"Status"} content={status} />
          <BookingsDetailCard title={"Venue"} content={venue} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="h5">Bands:</Typography>
          <BandStatusTable bands={bands} setTempBody={setTempBody} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography>
            Contact me if all musicians are unavailable:{" "}
            {isContactMe ? "✅" : "❌"}
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
