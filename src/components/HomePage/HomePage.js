import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Stack,
  Paper,
  Button,
  Modal,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bandBg from "../../assets/images/band-bg-blur.png";
import hero1 from "../../assets/images/hero1.jpg";

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
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

      console.log(response.data.name);
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("name", response.data.name);
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
      localStorage.setItem("name", response.data.name);

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
    <Box
      flex={1}
      sx={{
        backgroundImage: `url(${bandBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(3px)",
        backgroundSize: "cover",
        backgroundColor: "rgba(0,0,0,.5)",
        backgroundBlendMode: "multiply",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          pt={7}
          spacing={3}
        >
          <Paper sx={{ px: 5, py: 4 }} elevation={1}>
            <Typography variant="h1" fontFamily={"Meddon"} textAlign={"center"}>
              Opus
            </Typography>
          </Paper>

          <Typography variant="h2" textAlign={"center"} py={7}>
            Experience the nation's best musicians at your fingertips.
          </Typography>

          <Container maxWidth="lg">
            <Paper elevation={0} sx={{ backgroundColor: "rgb(10,10,10,0.7)" }}>
              <Stack
                direction={"row"}
                justifyContent={"space-around"}
                alignItems={"center"}
                p={2}
              >
                <Stack justifyContent={"center"} p={2}>
                  <Typography variant="h3">
                    Bring life to any occasion.
                  </Typography>
                  {/* <Typography variant="h3"> any occasion.</Typography> */}
                </Stack>
                <img
                  src={hero1}
                  alt="some guy singing"
                  width={"50%"}
                  style={{ objectFit: "cover" }}
                />
              </Stack>
            </Paper>
          </Container>

          <Container maxWidth="lg">
            <Paper elevation={0} sx={{ backgroundColor: "rgb(10,10,10,0.7)" }}>
              <Stack
                direction={"row"}
                justifyContent={"space-around"}
                alignItems={"center"}
                p={2}
              >
                <iframe
                  className="responsive-iframe"
                  width={"50%"}
                  // height={"315px"}
                  style={{ aspectRatio: "16/9" }}
                  src="https://www.youtube.com/embed/lbHQmwD0wiA"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  autoplay
                  muted
                  allowfullscreen
                ></iframe>
                <Stack justifyContent={"center"} p={2}>
                  <Typography variant="h3">
                    Discover up and coming talents.
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Container>

          <Stack justifyContent={"center"} alignItems={"center"} py={7}>
            <Typography variant="h3">
              Leave your audience mesmerized.
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Book our talents today.
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpenSignUpModal}
              sx={{ width: "fit-content", my: 3 }}
            >
              Sign Up
            </Button>
          </Stack>

          <Typography variant="h4" textAlign={"center"} fontWeight={400}>
            Already have an account?{" "}
          </Typography>
          <Button variant="contained" onClick={handleOpenLoginModal}>
            Log In
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
      </Container>
    </Box>
  );
};

export default HomePage;
