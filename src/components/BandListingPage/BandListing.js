import React, { useEffect } from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./BandListing.css";

const BandListingPage = () => {
  const gridStyles = {
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
  };
  return (
    <Stack alignItems={"center"} justifyContent={"center"} my={1}>
      <Typography variant="h3">Our Musicians</Typography>
      <Grid container spacing={2}>
        <Grid item xs={11} md={4}>
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
        <Grid item xs={11} md={4}>
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
        <Grid item xs={11} md={4}>
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
