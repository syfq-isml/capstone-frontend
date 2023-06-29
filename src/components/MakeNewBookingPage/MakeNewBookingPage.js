import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Stack, TextField, Typography } from "@mui/material";
// import { toast } from "react-toastify";

const MakeNewBookingPage = () => {
  const [state, setState] = useState({
    dateInput: "",
    timeInput: "",
    venueInput: "",
    eventNameInput: "",
  });
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
        console.log(getAllGenres);
      } catch (error) {
        console.error("Error occurred while loading all genres", error);
      }
    };
    if (accessToken) {
      loadAllGenres();
    }
  }, [accessToken]);

  //logic for "Back to main" button to navigate to default home page for logged in users:
  const navigateToHomePage = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // toast
    //   .promise(
    //     createUserWithEmailAndPassword(
    //       auth,
    //       state.emailInput,
    //       state.passwordInput
    //     ),
    //     {
    //       pending: "Creating an account...",
    //       success: "Successfully created an account!",
    //       error: "Oops, something went wrong. Try again!",
    //     }
    //   )
    //   .then(() => {
    //     toast.success("🐝 Successfully created a new account!");
    //     setState({ emailInput: "", passwordInput: "" });
    //   })
    //   .then(() => {
    //     navigate("/bookings");
    //   });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(state);
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={5}>
      <Typography variant="h2">
        Join Opus today to hire the best live musicians for your event.
      </Typography>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          mt={2}
        >
          <TextField
            required
            autoComplete="off"
            value={state.dateInput}
            size="small"
            id="dateInput"
            type="date"
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            autoComplete="off"
            value={state.timeInput}
            size="small"
            id="timeInput"
            type="time"
            onChange={handleChange}
          ></TextField>
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
          <br />
          <Button type="submit" variant="contained">
            Check Availability
          </Button>
        </Stack>
      </form>
      <br />
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={navigateToHomePage}
      >
        Back to main
      </Button>
    </Stack>
  );
};

export default MakeNewBookingPage;
