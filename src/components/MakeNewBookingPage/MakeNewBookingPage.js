import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MakeNewBookingPage = () => {
  const [state, setState] = useState({
    startDateTimeInput: "",
    endDateTimeInput: "",
    venueInput: "",
    eventNameInput: "",
    genreInput: "",
  });
  const [genres, setGenres] = useState([]);
  const [bandsAvailable, setBandsAvailable] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  // For Mobile Responsive View, these const are used in the return block later:
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  // This is the useEffect block to load all the genres for display in the genre input field:
  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const getAllGenres = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/genres`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(getAllGenres.data);
        setGenres(getAllGenres.data);
      } catch (error) {
        console.error("Error occurred while loading all genres", error);
      }
    };
    if (accessToken) {
      loadAllGenres();
    }
  }, [accessToken]);

  // Logic for when user hits "Check Availability" Button:
  const handleSubmitCheckAvailability = async (e) => {
    e.preventDefault();

    console.log(state.startDateTimeInput);
    console.log(state.endDateTimeInput);
    try {
      const getBandsAvailability = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/avail/genre/${state.genreInput}`,

        {
          startDateTime: state.startDateTimeInput,
          endDateTime: state.endDateTimeInput,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(getBandsAvailability.data);
      setBandsAvailable(getBandsAvailability.data);
    } catch (error) {
      console.error("Error occurred while finding available bands:", error);
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(state);
  };

  const handleGenreChange = (e) => {
    setState({ ...state, genreInput: e.target.value });
    console.log(state);
  };

  return (
    <Container maxWidth="sm">
      <Stack alignItems={"center"} justifyContent={"center"} my={5}>
        <Typography variant="h2" sx={{ textAlign: "center", fontSize: "2rem" }}>
          Hire the best live musicians for your event. Fill in the form and
          check artists' availability.
        </Typography>
        <br />
        <br />
        <form onSubmit={handleSubmitCheckAvailability}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
            mt={2}
          >
            <div>
              <TextField
                autoComplete="off"
                required
                value={state.startDateTimeInput}
                size="small"
                id="startDateTimeInput"
                type="datetime-local"
                label="Start Date & Time"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                sx={{
                  width: isMobile ? "100%" : "auto", // Adjust the width based on screen size
                }}
              />
              <Typography variant="h6" component="span">
                {" - "}
              </Typography>
              <TextField
                autoComplete="off"
                required
                value={state.endDateTimeInput}
                size="small"
                id="endDateTimeInput"
                type="datetime-local"
                label="End Date & Time"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                sx={{
                  width: isMobile ? "100%" : "auto", // Adjust the width based on screen size
                }}
              />
            </div>

            <TextField
              required
              autoComplete="off"
              value={state.venueInput}
              size="small"
              id="venueInput"
              type="venue"
              label="Venue"
              onChange={handleChange}
            ></TextField>
            <TextField
              required
              autoComplete="off"
              value={state.eventNameInput}
              size="small"
              id="eventNameInput"
              type="eventname"
              label="Event Name"
              onChange={handleChange}
            ></TextField>
            <TextField
              required
              autoComplete="off"
              select
              value={state.genreInput}
              size="small"
              id="genreInput"
              label="Genre"
              onChange={handleGenreChange}
              sx={{ width: "200px" }}
            >
              {genres.map((genre) => (
                <MenuItem value={genre.id} key={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </TextField>
            <br />

            <Button type="submit" variant="contained" sx={{ width: "200px" }}>
              Check Availability
            </Button>
          </Stack>
        </form>
        {bandsAvailable.length > 0 && (
          <Grid container spacing={2} mt={4}>
            {bandsAvailable.map((band) => (
              <Grid item xs={12} sm={6} md={4} key={band.id}>
                <Card
                  sx={{
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "100%",
                    }}
                    image={band.photoUrl}
                    alt={band.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{band.name}</Typography>
                  </CardContent>
                  <CardActions sx={{ marginTop: "auto" }}>
                    <Stack
                      direction="column"
                      spacing={1}
                      sx={{ width: "100%" }}
                    >
                      <Button variant="contained" fullWidth>
                        View Info
                      </Button>
                      <Button variant="contained" fullWidth>
                        Select
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default MakeNewBookingPage;
