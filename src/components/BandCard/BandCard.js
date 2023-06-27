import { Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import BandModal from "./BandModal/BandModal";
import "./BandCard.css";

const BandCard = () => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className="band-card">
        <CardMedia
          className="band-image"
          component="img"
          image="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Vetta Quartet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            An ensemble structure of 2 violins, 1 viola and 1 cello – creating a
            full sound with rich harmonies. Elegantly reflects the quality of
            your organisation and event.
          </Typography>
        </CardContent>
        <Box textAlign="center">
          <Chip label="String Quartet" className="band-category" />
          <Chip label="Classical" className="band-category" />
        </Box>
        <Box textAlign="center" my={1}>
          <Button justifyContent={"center"} size="small">
            <BandModal />
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default BandCard;
