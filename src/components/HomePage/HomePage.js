import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Stack,
  Paper,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    emailInput: "",
    passwordInput: "",
    newUserNameInput: "",
    newUserEmailInput: "",
    newUserPasswordInput: "",
    newUserPhoneNumberInput: "",
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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
          navigate("/");
        } else {
          navigate("/homepage");
        }
      } catch (error) {
        console.error(
          "Error occurred while checking if user was logged in",
          error
        );
        navigate("/homepage");
      }
    };
    if (accessToken) {
      checkIfAccessTokenIsValid();
    } else return;
  }, [accessToken, navigate]);

  // THIS IS FOR HANDLING THE OPENING AND CLOSING OF THE LOGIN MODAL:
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // THIS IS FOR HANDLING THE OPENIGN AND CLOSING OF THE SIGN UP MODAL:
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  // THIS IS TO HANDLE CHANGE IN THE INPUT FIELDS FOR THE RELEVANT LOGIN/SIGNUP MODALS:
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  // THIS IS THE LOGIC FOR WHEN USER HITS THE LOG IN BUTTON AFTER FILLING UP THE LOG IN FORM FIELDS:
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          email: state.emailInput,
          password: state.passwordInput,
        }
      );

      console.log(response.data);
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userId", response.data.id);
      setState({
        emailInput: "",
        passwordInput: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password.");
    }
  };
  // THIS IS THE LOGIC FOR WHEN USER HITS THE SIGN UP BUTTON AFTER FILLING UP THE SIGN UP FORM FIELDS:
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          name: state.newUserNameInput,
          email: state.newUserEmailInput,
          password: state.newUserPasswordInput,
          phoneNumber: state.newUserPhoneNumberInput,
        }
      );

      console.log(response.data);
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userId", response.data.id);

      setState({
        newUserNameInput: "",
        newUserEmailInput: "",
        newUserPasswordInput: "",
        newUserPhoneNumberInput: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An account already exists with this email.");
    }
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
      <Button variant="contained" onClick={handleOpenLoginModal}>
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
      <Button variant="contained" onClick={handleOpenSignUpModal}>
        Sign Up
      </Button>

      {/* Login Modal */}
      <Modal open={isLoginModalOpen} onClose={handleCloseLoginModal}>
        <Paper sx={{ p: 4, maxWidth: 400, margin: "0 auto", mt: 10 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Log In
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              required
              label="Email"
              type="email"
              value={state.emailInput}
              name="emailInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label="Password"
              type="password"
              value={state.passwordInput}
              name="passwordInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Log In
            </Button>
          </form>
        </Paper>
      </Modal>

      {/* SignUp Modal */}
      <Modal open={isSignUpModalOpen} onClose={handleCloseSignUpModal}>
        <Paper sx={{ p: 4, maxWidth: 400, margin: "0 auto", mt: 10 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Register
          </Typography>
          <form onSubmit={handleSignUp}>
            <TextField
              required
              label="Name"
              type="name"
              value={state.newUserNameInput}
              name="newUserNameInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label="Email"
              type="email"
              value={state.newUserEmailInput}
              name="newUserEmailInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label="Password"
              type="password"
              value={state.newUserPasswordInput}
              name="newUserPasswordInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              required
              label="Phone No."
              type="Phone Number"
              value={state.newUserPhoneNumberInput}
              name="newUserPhoneNumberInput"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </form>
        </Paper>
      </Modal>

      <br />
      <br />
      <br />
      <br />
    </Stack>
  );
};

export default HomePage;
