import React, { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  //
  // please include useEffect block to check if user is logged in, if yes, then redirect to the default "homepage" for logged in users

  // useEffect(()=>{
  // logic to check if user is signed in to go here.
  // }, [])

  const signUpButton = () => {
    navigate("/signup");
  };

  const loginButton = () => {
    navigate("/login");
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Paper sx={{ px: 5, py: 4, my: 7 }} elevation={0}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Arial", textAlign: "center" }}
        >
          OPUS <br />
        </Typography>
      </Paper>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Arial", textAlign: "center" }}
      >
        The nation's best musicians at your fingertips
      </Typography>
      <br />
      <br />
      <Button variant="contained" onClick={loginButton}>
        Log In
      </Button>
      <br />
      <br />
      <Typography
        variant="h4"
        sx={{ fontFamily: "Arial", textAlign: "center" }}
      >
        Don't have an account yet?
      </Typography>
      <br />
      <br />
      <Button variant="contained" onClick={signUpButton}>
        Sign Up
      </Button>
      <br />
      <br />
      <br />
      <br />
    </Stack>
  );
};

export default LoginPage;
