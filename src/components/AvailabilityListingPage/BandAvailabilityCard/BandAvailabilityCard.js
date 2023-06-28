import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useState } from "react";

import "./BandAvailabilityCard.css";
import { useNavigate } from "react-router-dom";

const BandAvailabilityCard = ({ props }) => {
  const { name, photoUrl, genres, id } = props;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin-availability/${id}`);
  };

  return (
    <Grid item sm={12} md={6} lg={4} xl={3} my={1}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 2,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <CardMedia
          className="band-image-circle"
          component="img"
          image={photoUrl}
        />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Box textAlign="center">
            {genres.map((genre) => {
              return (
                <Chip
                  label={genre.name}
                  key={genre.id + name}
                  className="band-category"
                />
              );
            })}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default BandAvailabilityCard;
