import { Typography, Card, CardContent, Paper, Stack } from "@mui/material";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { formatDateCard } from "../../utils/formatDate";

import "./AdminBookingCard.css";
import {
  AccessTime,
  CheckCircleOutlined,
  PaidOutlined,
} from "@mui/icons-material";

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
      sx={{ m: 2, cursor: "pointer" }}
      onClick={handleView}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* {statusIcon} */}
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
          <b>Client: </b>
          {client.name}
        </Typography>
        <Typography>
          <b>Confirmed Musician:</b> {bandStatus}
        </Typography>
        {status === "Pending" && (
          <Paper sx={{ width: "fit-content", backgroundColor: "#CECECE" }}>
            <Stack
              direction={"row"}
              spacing={0.5}
              alignItems={"center"}
              justifyContent={"center"}
              py={0.5}
              px={1}
            >
              <AccessTime fontSize="small" sx={{ color: "black" }} />
              <Typography fontWeight={600} color={"black"}>
                {status}
              </Typography>
            </Stack>
          </Paper>
        )}

        {status === "Awaiting Payment" && (
          <Paper sx={{ width: "fit-content", backgroundColor: "orange" }}>
            <Stack
              direction={"row"}
              spacing={0.5}
              alignItems={"center"}
              justifyContent={"center"}
              py={0.5}
              px={1}
            >
              <PaidOutlined fontSize="small" sx={{ color: "black" }} />
              <Typography fontWeight={600} color={"black"}>
                {status}
              </Typography>
            </Stack>
          </Paper>
        )}

        {status === "Paid & Confirmed" && (
          <Paper sx={{ width: "fit-content", backgroundColor: "#00DD53" }}>
            <Stack
              direction={"row"}
              spacing={0.5}
              alignItems={"center"}
              justifyContent={"center"}
              py={0.5}
              px={1}
            >
              <CheckCircleOutlined fontSize="small" sx={{ color: "black" }} />
              <Typography fontWeight={600} color={"black"}>
                {status}
              </Typography>
            </Stack>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminBookingCard;
