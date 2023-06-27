import { Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import BandModal from "./BandModal/BandModal";
import "./BandCard.css";

const BandCard = ({ props }) => {
  const { name, description, photoUrl, genres } = props;
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className="band-card">
        <CardMedia className="band-image" component="img" image={photoUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.split(".")[0]}
          </Typography>
        </CardContent>
        <Box textAlign="center">
          {genres.map((genre) => {
            return (
              <Chip
                label={genre.name}
                key={genre.id + genre.band_genres.BandId}
                className="band-category"
              />
            );
          })}
        </Box>
        <Box textAlign="center" my={1}>
          <BandModal props={props} />
        </Box>
      </Card>
    </Grid>
  );
};

export default BandCard;
