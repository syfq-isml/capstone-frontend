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
  Modal,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [selectedBandInfo, setSelectedBandInfo] = useState(null);
  const [selectedBands, setSelectedBands] = useState([]);
  const [selectedBandIdRank, setSelectedBandIdRank] = useState([]);
  const [isViewInfoModalOpen, setIsViewInfoModalOpen] = useState(false);
  const [isContactMe, setIsContactMe] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const userId = localStorage.getItem("userId");
  console.log("userId:", userId);

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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
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

  // Logic for when user selects their top 3 bands in order of preference:
  const handleSelectBand = (band) => {
    setSelectedBands((selectedBands) => {
      // Check if the band is already selected and what their corresponding index number is wihtin the selectedBands state array:
      const bandIndex = selectedBands.findIndex(
        (selectedBand) => selectedBand.id === band.id
      );
      // If there is a match, i.e. if the bandIndex for this particular band DOES exist because .findIndex returns a positive number or 0:
      if (bandIndex !== -1) {
        // If the band is already selected, remove it from the selected bands (this is under the assumption that the user is clicking the SAME button to deselect band):
        const updatedSelectedBands = [...selectedBands];
        updatedSelectedBands.splice(bandIndex, 1);
        return updateRankings(updatedSelectedBands); // Update rankings after removing the band
      } else {
        // If the band is not yet selected (i.e. user has clicked select on a band that before the click was not selected), add it to the selected bands with a ranking
        const ranking = selectedBands.length + 1; // Add 1 to the selectedBands.length since on the first 'select', rankings have to start from 1 and not 0 like in a normal array.
        const updatedSelectedBands = [...selectedBands, { ...band, ranking }];
        console.log(updatedSelectedBands);
        return updateRankings(updatedSelectedBands); // Update rankings after adding the band
      }
    });
  };
  // Logic for SORTING the bands in 1.)ascending ranking number order and 2.)in consecutively increasing ranking number order; ensuring no ranking number is skipped/left out:
  const updateRankings = (bands) => {
    // Sort the bands based on their rankings in numerically ascending order (regardless of if the current rankings all appear in consecutive order, i.e. some ranking numbers MIGHT be missing)
    const sortedBands = bands.sort((a, b) => a.ranking - b.ranking);

    // Update the rankings of the bands AFTER sorting to ensure that all the corresponding rankings appear in CONSECUTIVE ascending order, i.e. no ranking number has been skipped or is missing:
    const updatedBands = sortedBands.map((band, index) => ({
      ...band,
      ranking: index + 1,
    }));
    console.log(updatedBands);
    setSelectedBandIdRank(
      updatedBands.map((band) => ({
        id: band.id,
        ranking: band.ranking,
      }))
    );
    return updatedBands;
  };
  console.log("selectedBandIdRank:", selectedBandIdRank);
  // console.log(selectedBandIdRank[0].ranking);
  // console.log(selectedBandIdRank[0].id);

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

  // Logic for when user hits "Review" Button:
  const handleReview = (e) => {
    e.preventDefault();
    if (
      selectedBandIdRank.length === 3 &&
      (isContactMe === true || isContactMe === false)
    ) {
      setIsReviewing(true);
      setIsEditing(false);
    } else {
      // Show an error message
      toast.error("Please select 3 bands and choose a booking option.");
      console.log("Please select exactly three bands.");
    }
  };
  // Logic for when user hits "Edit" Button:
  const handleEdit = (e) => {
    e.preventDefault();
    setIsReviewing(false);
    setIsEditing(true);
  };

  // Logic for when user hits "Submit" Button:
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const submitBooking = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/bookings/user/${userId}/genre/${state.genreInput}`,
        {
          startDateTime: state.startDateTimeInput,
          endDateTime: state.endDateTimeInput,
          venue: state.venueInput,
          eventName: state.eventNameInput,
          isContactMe: isContactMe,
          band1Id: selectedBandIdRank[0].id,
          band1Rank: selectedBandIdRank[0].ranking,
          band2Id: selectedBandIdRank[1].id,
          band2Rank: selectedBandIdRank[1].ranking,
          band3Id: selectedBandIdRank[2].id,
          band3Rank: selectedBandIdRank[2].ranking,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(submitBooking);
      toast.success(
        "Hurray! You just made a new booking. It's status is only confirmed AFTER payment."
      );
      navigate("/");
    } catch (error) {
      console.error(
        "Error occurred while submitting form data to backend:",
        error
      );
      toast.error("Oh no! Form submissio failed. Please try again.");
    }
  };

  // ALL THE FORM HANDLE CHANGES:
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(state);
  };

  const handleGenreChange = (e) => {
    setState({ ...state, genreInput: e.target.value });
    console.log("genreInput:", state.genreInput);
  };

  const handleBookingOptionChange = (e) => {
    setIsContactMe(e.target.value);
  };
  console.log("isContactMe:", isContactMe);
  //
  //

  // THIS IS FOR HANDLING THE OPENING AND CLOSING OF THE VIEW INFO MODAL:
  const handleOpenViewInfoModal = (band) => {
    setSelectedBandInfo(band);
    setIsViewInfoModalOpen(true);
  };
  const handleCloseViewInfoModal = () => {
    setIsViewInfoModalOpen(false);
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
                disabled={isReviewing && !isEditing}
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
                disabled={isReviewing && !isEditing}
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
              disabled={isReviewing && !isEditing}
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
              disabled={isReviewing && !isEditing}
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
              disabled={isReviewing && !isEditing}
              sx={{ width: "200px" }}
            >
              {genres.map((genre) => (
                <MenuItem value={genre.id} key={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </TextField>
            <br />

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "200px" }}
              disabled={isReviewing && !isEditing}
            >
              Check Availability
            </Button>
          </Stack>
        </form>
        {bandsAvailable.length > 0 && (
          <Grid container spacing={2} mt={4}>
            {bandsAvailable.map((band) => {
              // Check if the band is already selected
              const isSelected = selectedBands.some(
                (selectedBand) => selectedBand.id === band.id
              );
              // Find the band's ranking if it's already selected
              const ranking = selectedBands.find(
                (selectedBand) => selectedBand.id === band.id
              )?.ranking;

              return (
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
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleOpenViewInfoModal(band)}
                        >
                          View Info
                        </Button>

                        {/* View Info Modal */}
                        <Modal
                          open={isViewInfoModalOpen}
                          onClose={handleCloseViewInfoModal}
                        >
                          <Paper
                            sx={{
                              p: 2,
                              maxWidth: "90vw",
                              width: 400,
                              margin: "0 auto",
                              mt: 10,
                            }}
                          >
                            {selectedBandInfo && (
                              <>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                  {selectedBandInfo.name}
                                </Typography>
                                <CardMedia
                                  component="img"
                                  sx={{
                                    height: 300,
                                    objectFit: "cover",
                                    mb: 2,
                                  }}
                                  image={selectedBandInfo.photoUrl}
                                  alt={selectedBandInfo.name}
                                />
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                  {selectedBandInfo.description}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                  Rate: ${selectedBandInfo.gigRate}
                                </Typography>
                              </>
                            )}
                          </Paper>
                        </Modal>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            if (
                              selectedBandIdRank.length === 3 &&
                              !isSelected
                            ) {
                              toast.error("You have already selected 3 bands.");
                            } else {
                              handleSelectBand(band);
                            }
                          }}
                          disabled={isReviewing && !isEditing}
                        >
                          {isSelected ? "Deselect" : "Select"}
                        </Button>
                        {isSelected && (
                          <Typography
                            variant="body2"
                            sx={{ textAlign: "right" }}
                          >
                            Preference: {ranking}
                          </Typography>
                        )}
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
            <form>
              <Stack alignItems="center" justifyContent="center" mt={4}>
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                  In the event that none of your chosen musicians are available,
                  please select your preference:
                </Typography>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "center" : "flex-start"}
                  justifyContent="center"
                  spacing={2}
                  mt={4}
                >
                  <TextField
                    required
                    autoComplete="off"
                    select
                    value={isContactMe}
                    size="small"
                    id="bookingOption"
                    label="Booking Option"
                    onChange={handleBookingOptionChange}
                    disabled={isReviewing && !isEditing}
                    sx={{ width: isMobile ? "100%" : "200px" }}
                  >
                    <MenuItem value={true}>Contact Me</MenuItem>
                    <MenuItem value={false}>Remove My Booking</MenuItem>
                  </TextField>
                  <Button
                    variant="contained"
                    sx={{
                      width: "200px",
                      backgroundColor: isReviewing ? "green" : "red",
                    }}
                    onClick={isReviewing ? handleEdit : handleReview}
                    disableElevation
                  >
                    {isReviewing ? "Edit" : "Review"}
                  </Button>
                  {isReviewing && (
                    <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        backgroundColor: "red",
                      }}
                      onClick={handleSubmitBooking}
                    >
                      Submit Booking
                    </Button>
                  )}
                </Stack>
              </Stack>
            </form>
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default MakeNewBookingPage;
