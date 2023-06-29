import { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import BookingCard from "./BookingCard/BookingCard";

import "./ClientDashboard.css";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  // useEffect block to check if user is logged in or not:
  useEffect(() => {
    const checkIfAccessTokenIsValid = async () => {
      try {
        const checkAccessToken = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(checkAccessToken.data.msg);
        if (checkAccessToken.data.msg === "Valid Token") {
          return;
        }
      } catch (error) {
        console.log(error.response.data.msg);
        console.error(
          "Error occurred while checking if user was logged in",
          error
        );
        navigate("/homepage");
      }
    };
    if (accessToken) {
      checkIfAccessTokenIsValid();
    } else navigate("/homepage");
  }, [accessToken, navigate]);

  let myBookings = [
    {
      id: 1,
      start_date_time: new Date("Sat Jan 20 2024 11:30:00 GMT+0800"),
      end_date_time: new Date("Sat Jan 20 2024 15:00:00 GMT+0800"),
      venue: "Rizz Carlton",
      event_name: "My Fourth Wedding",
      genre_id: 1,
      client_id: 1,
      is_contact_me: true,
      status: "Pending",
      bands_bookings: [
        {
          id: 1,
          band_id: {
            id: 4, // int
            name: "Vetta Quartet", // str
            gigRate: 2000, // int
            description: ` Vetta Quartet is an established ensemble structure of 2 violins, 1 viola and 1 cello – creating a full sound with rich harmonies. Coupled with its visual aesthetics, the String Quartet elegantly reflects the quality of your organisation and event.
The String Quartet is VETTA’s flagship service, and is a well-recognised and sought-after live music band / string quartet for Singapore weddings and corporate events, with consistent bookings months in advance. `, // str
            photoUrl:
              "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png", // str
            genres: [
              {
                id: 7,
                name: "String Quartet",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 4,
                },
              },
              {
                id: 8,
                name: "Classical",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 6,
                },
              },
            ], // arr of strs
          },
          booking_id: 1,
          status: "Not contacted",
          rank: 1,
        },
        {
          id: 2,
          band_id: 4,
          booking_id: 1,
          status: "Rejected",
          rank: 2,
        },
        {
          id: 3,
          band_id: 5,
          booking_id: 1,
          status: "Not contacted",
          rank: 3,
        },
      ],
    },
    {
      id: 2,
      start_date_time: new Date("Mon Jan 22 2024 23:30:00 GMT+0800"),
      end_date_time: new Date("Tue Jan 23 2024 04:00:00 GMT+0800"),
      venue: "Choa Chu Kang Block 82 Void Deck",
      event_name: "Rock & Roll Fiesta",
      genre_id: 1,
      client_id: 1,
      is_contact_me: true,
      status: "Paid & Confirmed",
      bands_bookings: [
        {
          id: 1,
          band_id: {
            id: 4, // int
            name: "Vetta Quartet", // str
            gigRate: 2000, // int
            description: ` Vetta Quartet is an established ensemble structure of 2 violins, 1 viola and 1 cello – creating a full sound with rich harmonies. Coupled with its visual aesthetics, the String Quartet elegantly reflects the quality of your organisation and event.
The String Quartet is VETTA’s flagship service, and is a well-recognised and sought-after live music band / string quartet for Singapore weddings and corporate events, with consistent bookings months in advance. `, // str
            photoUrl:
              "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png", // str
            genres: [
              {
                id: 7,
                name: "String Quartet",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 4,
                },
              },
              {
                id: 8,
                name: "Classical",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 6,
                },
              },
            ], // arr of strs
          },
          booking_id: 1,
          status: "Not contacted",
          rank: 1,
        },
        {
          id: 2,
          band_id: 4,
          booking_id: 1,
          status: "Rejected",
          rank: 2,
        },
        {
          id: 3,
          band_id: 5,
          booking_id: 1,
          status: "Not contacted",
          rank: 3,
        },
      ],
    },
    {
      id: 3,
      start_date_time: new Date("Mon Jan 22 2024 23:30:00 GMT+0800"),
      end_date_time: new Date("Tue Jan 23 2024 04:00:00 GMT+0800"),
      venue: "Evergrande Ballroom",
      event_name: "27th Annual Singapore Ballroom Competition",
      genre_id: 1,
      client_id: 1,
      is_contact_me: true,
      status: "Awaiting Payment",
      bands_bookings: [
        {
          id: 1,
          band_id: {
            id: 4, // int
            name: "Vetta Quartet", // str
            gigRate: 2000, // int
            description: ` Vetta Quartet is an established ensemble structure of 2 violins, 1 viola and 1 cello – creating a full sound with rich harmonies. Coupled with its visual aesthetics, the String Quartet elegantly reflects the quality of your organisation and event.
The String Quartet is VETTA’s flagship service, and is a well-recognised and sought-after live music band / string quartet for Singapore weddings and corporate events, with consistent bookings months in advance. `, // str
            photoUrl:
              "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png", // str
            genres: [
              {
                id: 7,
                name: "String Quartet",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 4,
                },
              },
              {
                id: 8,
                name: "Classical",
                createdAt: "2023-06-24T14:58:57.294Z",
                updatedAt: "2023-06-24T14:58:57.294Z",
                band_genres: {
                  createdAt: "2023-06-24T14:58:57.296Z",
                  updatedAt: "2023-06-24T14:58:57.296Z",
                  BandId: 4,
                  GenreId: 6,
                },
              },
            ], // arr of strs
          },
          booking_id: 1,
          status: "Not contacted",
          rank: 1,
        },
        {
          id: 2,
          band_id: 4,
          booking_id: 1,
          status: "Rejected",
          rank: 2,
        },
        {
          id: 3,
          band_id: 5,
          booking_id: 1,
          status: "Not contacted",
          rank: 3,
        },
      ],
    },
  ];
  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h4" my={1} sx={{ textAlign: "center" }}>
        Bookings Dashboard
      </Typography>
      <Typography my={1}>
        {!myBookings.length && (
          <div>
            <div className="client-dashboard-emoji">😪</div>
            <div>You currently have no bookings.</div>
          </div>
        )}
      </Typography>
      <Box mb={3}>
        {myBookings.map((booking) => {
          return <BookingCard key={booking.event_name} props={booking} />;
        })}
      </Box>
      <Button variant="contained">+ Create New Booking</Button>
    </Stack>
  );
};

export default ClientDashboard;
