import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./BookingCard.css";

const BookingCard = ({ props }) => {
  const navigate = useNavigate();
  const { eventName, startDateTime, endDateTime, venue, status } = props;
  const [bookingStatusClass, setBookingStatusClass] = useState("pending");
  const [statusIcon, setStatusIcon] = useState("⌛");

  useEffect(() => {
    const statusRef = {
      Pending: "pending",
      "Awaiting Payment": "await-payment",
      "Paid & Confirmed": "confirmed",
    };
    const iconRef = {
      Pending: "⌛ ",
      "Awaiting Payment": "📩 ",
      "Paid & Confirmed": "✅ ",
    };
    setBookingStatusClass(statusRef[status]);
    setStatusIcon(iconRef[status]);
  }, [status]);

  const handleView = () => {
    navigate("/booking-request", { state: props });
  };

  return (
    <Card className={`booking-card ${bookingStatusClass}`} sx={{ mb: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {statusIcon}
          {eventName}
        </Typography>
        <Typography>
          <b>Start: </b>
          {startDateTime.toString()}
        </Typography>
        <Typography>
          <b>End: </b>
          {endDateTime.toString()}
        </Typography>
        <Typography>
          <b>Venue: </b>
          {venue}
        </Typography>
        <Typography>
          <b>Status: </b>
          {status}
        </Typography>
        <Button onClick={handleView}>View More</Button>
        {status === "Awaiting Payment" ? <Button>Pay here</Button> : null}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
