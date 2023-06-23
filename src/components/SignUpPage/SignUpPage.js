import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [state, setState] = useState({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    phoneNumberInput: "",
  });
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate("/");
  };
  //   useEffect(() => {
  //     logic to check if user is already logged in, if yes then redirect to default home page for logged in users
  //   }, []);

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
            value={state.nameInput}
            size="small"
            id="nameInput"
            type="name"
            label="Name"
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            autoComplete="off"
            value={state.emailInput}
            size="small"
            id="emailInput"
            type="email"
            label="Email"
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            autoComplete="off"
            value={state.passwordInput}
            size="small"
            id="passwordInput"
            type="password"
            label="Password"
            onChange={handleChange}
          ></TextField>
          <TextField
            required
            autoComplete="off"
            value={state.phoneNumberInput}
            size="small"
            id="phoneNumberInput"
            type="phonenumber"
            label="Phone No."
            onChange={handleChange}
          ></TextField>
          <br />
          <Button type="submit" variant="contained">
            Sign Up
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

export default SignUpPage;
