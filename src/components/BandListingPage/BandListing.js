import React from "react";
import { useState, useEffect } from "react";

import { Typography, Stack, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import BandCard from "../BandCard/BandCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const BandListingPage = () => {
  const [bands, setBands] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    const getBands = async () => {
      try {
        const currentBands = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/bands/genres`
        );
        setBands(currentBands.data);
      } catch (error) {
        console.error("Error occurred while loading all bands", error);
      }
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
    <Container maxWidth="xl">
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        my={1}
        ml={4}
        mr={4}
        pb={4}
      >
        <Typography variant="h3" my={3}>
          Our Musicians
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
              return <BandCard key={band.name} props={band} />;
            }
            for (const genre of band.genres) {
              if (genre.name === selectedGenre) {
                return <BandCard key={band.name} props={band} />;
              }
            }
          })}
        </Grid>
      </Stack>
    </Container>
  );
};

export default BandListingPage;
