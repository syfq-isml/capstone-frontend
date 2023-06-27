import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Stack, TextField, Typography } from "@mui/material";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          name: state.nameInput,
          email: state.emailInput,
          password: state.passwordInput,
          phoneNumber: state.phoneNumberInput,
        }
      );

      console.log(response.data.token);
      localStorage.setItem("accessToken", response.data.token);

      setState({
        nameInput: "",
        emailInput: "",
        passwordInput: "",
        phoneNumberInput: "",
      });

      navigate("/bands");
    } catch (error) {
      console.log(error);
    }
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
