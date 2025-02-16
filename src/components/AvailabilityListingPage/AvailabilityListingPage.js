import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import BandAvailabilityCard from "./BandAvailabilityCard/BandAvailabilityCard";

import axios from "axios";

const AvailabilityListingPage = () => {
  const [bands, setBands] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [genres, setGenres] = useState([]);

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
  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    const getBands = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/bands/genres`)
        .then((res) => {
          // console.log("res.data: ", res.data);
          setBands(res.data);
        });
    };
    getBands();
  }, []);

  useEffect(() => {
    const loadAllGenres = async () => {
      try {
        const getAllGenres = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/genres`
        );
        setGenres(getAllGenres.data);
      } catch (error) {
        console.error("Error occurred while loading all genres", error);
      }
    };
    loadAllGenres();
  }, []);

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      my={1}
      ml={4}
      mr={4}
      pb={4}
    >
      <Typography variant="h3" my={3}>
        All Musician Availability
      </Typography>
      <FormControl>
        <InputLabel id="select-helper-label">Genre</InputLabel>
        <Select
          labelId="select-helper-label"
          id="simple-select-helper"
          value={selectedGenre}
          label="selectedGenre"
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {genres.map((genre) => {
            return (
              <MenuItem value={genre.name} key={genre.name}>
                {genre.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Filter by Genre</FormHelperText>
      </FormControl>
      <Grid container spacing={2} my={1}>
        {bands.map((band) => {
          if (selectedGenre === "All") {
            return <BandAvailabilityCard key={band.name} props={band} />;
          }
          for (const genre of band.genres) {
            if (genre.name === selectedGenre) {
              return <BandAvailabilityCard key={band.name} props={band} />;
            }
          }
        })}
      </Grid>
    </Stack>
  );
};

export default AvailabilityListingPage;
