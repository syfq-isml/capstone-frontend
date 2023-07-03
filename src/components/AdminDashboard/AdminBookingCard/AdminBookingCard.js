import { Typography, Card, CardContent } from "@mui/material";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { formatDateCard } from "../../utils/formatDate";

import "./AdminBookingCard.css";

const AdminBookingCard = ({ props }) => {
  const navigate = useNavigate();

  const {
    eventName,
    startDateTime,
    endDateTime,
    venue,
    status,
    client,
    bands,
  } = props;
  const [bookingStatusClass, setBookingStatusClass] = useState("pending");
  const [statusIcon, setStatusIcon] = useState("⌛");
  const [bandStatus, setBandStatus] = useState("None");

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

  useEffect(() => {
    const confirmedBand = bands.filter((band) => {
      return band.bandBooking.status === "Confirmed";
    });
    console.log(confirmedBand);
    if (confirmedBand.length === 0) {
      setBandStatus("None");
    } else {
      setBandStatus(confirmedBand[0].name);
    }
  }, [bands]);

  const handleView = () => {
    navigate("/admin-booking-request", { state: props });
  };

  return (
    <Card
      className={`booking-card`}
      sx={{ m: 2, backgroundColor: "#f0f2fc", cursor: "pointer" }}
      onClick={handleView}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {statusIcon}
          {eventName}
        </Typography>
        <Typography sx={{ fontSize: "1.5em" }}>
          {formatDateCard(startDateTime)} - {formatDateCard(endDateTime)}
        </Typography>
        <Typography>
          <b>Venue: </b>
          {venue}
        </Typography>
        <Typography>
          <b>Status: </b>
          {status}
        </Typography>
        <Typography>
          <b>Client: </b>
          {client.name}
        </Typography>
        <Typography>
          <b>Confirmed Musician:</b> {bandStatus}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdminBookingCard;
