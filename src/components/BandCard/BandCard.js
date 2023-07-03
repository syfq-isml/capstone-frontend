import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import BandModal from "./BandModal/BandModal";

import { useState } from "react";

import "./BandCard.css";

const BandCard = ({ props }) => {
  const { name, description, photoUrl, genres } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className="band-card">
        <CardMedia
          className="band-image"
          component="img"
          image={photoUrl}
          onClick={handleOpen}
          sx={{ cursor: "pointer" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.substr(0, 100) + "..."}
          </Typography>
        </CardContent>
        <Box textAlign="center">
          {genres.map((genre) => {
            return (
              <Chip
                label={genre.name}
                key={genre.id + name}
                className="band-category"
                sx={{ p: 1, mx: 0.5 }}
              />
            );
          })}
        </Box>
        <Box textAlign="center" my={1}>
          <BandModal
            props={props}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default BandCard;
