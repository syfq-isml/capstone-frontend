import React, { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";

const LoginPage = () => {
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
      <Button variant="contained">Log In</Button>
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
      <Button variant="contained">Sign Up</Button>
      <br />
      <br />
      <br />
      <br />
    </Stack>
  );
};

export default LoginPage;
