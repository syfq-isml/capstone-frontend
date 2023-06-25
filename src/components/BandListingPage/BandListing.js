import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import "./BandListing.css";
import BandCard from "../BandCard/BandCard";

const BandListingPage = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      my={1}
      ml={4}
      mr={4}
      pb={4}
    >
      <Typography variant="h3">Our Musicians</Typography>
      <Grid container spacing={2} my={2}>
        <BandCard />
        <Grid item xs={12} md={4}>
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
                An ensemble structure of 2 violins, 1 viola and 1 cello –
                creating a full sound with rich harmonies. Elegantly reflects
                the quality of your organisation and event.
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Chip label="String Quartet" className="band-category" />
              <Chip label="Classical" className="band-category" />
            </Box>
            <Box textAlign="center" my={2}>
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="band-card">
            <CardMedia
              className="band-image"
              component="img"
              image="https://expatliving.sg/wp-content/uploads/2019/04/astronauts-band-local-music-singapore-live-music.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Astronauts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This four-piece electronic-pop band's dancey originals are a fab
                mash of retro-inspired beats and infectious synth licks.
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="band-card">
            <CardMedia
              className="band-image"
              component="img"
              image="https://cdn-star2-com.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2015/06/queen.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Queen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="band-card">
            <CardMedia
              className="band-image"
              component="img"
              image="https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2020/10/16/41e9b47c-07af-11eb-afc8-92e0da0ef1c3_image_hires_155550.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Black Pink
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="band-card">
            <CardMedia
              className="band-image"
              component="img"
              image="https://static.wixstatic.com/media/d16e40_71d406893d254b0b95485a7520e4f1e8~mv2.jpg/v1/fill/w_600,h_600,al_c,lg_1,q_80/d16e40_71d406893d254b0b95485a7520e4f1e8~mv2.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Beyond
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="band-card">
            <CardMedia
              className="band-image"
              component="img"
              image="https://cdn-star2-com.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2015/06/queen.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Queen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Box textAlign="center">
              <Button justifyContent={"center"} size="small">
                Learn More
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BandListingPage;
