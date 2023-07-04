import { Paper, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  AccessTime,
  CheckCircleOutlined,
  PaidOutlined,
} from "@mui/icons-material";

import { formatDateCard } from "../../utils/formatDate";

const BookingCard = ({ props }) => {
  console.log(props);
  const navigate = useNavigate();
  const { id, eventName, startDateTime, endDateTime, venue, status } = props;
  const [bookingStatusClass, setBookingStatusClass] = useState("pending");
  const [statusIcon, setStatusIcon] = useState("⌛");
  const accessToken = localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/payments/booking/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      window.location = response.data.url;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ m: 2 }} align="left">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* {statusIcon} */}
          {eventName}
        </Typography>
        {status === "Pending" && (
          <Box my={1}>
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
          </Box>
        )}

        {status === "Awaiting Payment" && (
          <Box my={1}>
            <Paper
              sx={{ width: "fit-content", backgroundColor: "orange" }}
              my={1}
            >
              <Stack
                direction={"row"}
                spacing={0.5}
                alignItems={"center"}
                justifyContent={"center"}
                py={0.5}
                px={1}
              >
                <PaidOutlined fontSize="small" sx={{ color: "black" }} my={1} />
                <Typography fontWeight={600} color={"black"}>
                  {status}
                </Typography>
              </Stack>
            </Paper>
          </Box>
        )}

        {status === "Paid & Confirmed" && (
          <Box my={1}>
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
          </Box>
        )}
        <Typography sx={{ fontSize: "1.2em" }}>
          {formatDateCard(startDateTime)} - {formatDateCard(endDateTime)}
        </Typography>
        <Typography>
          <b>Venue: </b>
          {venue}
        </Typography>

        <Button onClick={handleView}>View More</Button>
        {status === "Awaiting Payment" ? (
          <Button onClick={handleCheckout} disabled={isLoading ? true : false}>
            Pay here
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
