import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./BandListing.css";
import BandCard from "../BandCard/BandCard";

const BandListingPage = () => {
  const bands = [
    {
      id: 1,
      name: "Amplified",
      gigRate: 1000,
      description:
        'Amplified is a rock band consisting of three young boys from Hong Kong. \n  While from Hong Kong, they are primarily known in Japan. \n  They were discovered through Sony Music Japan\'s International Audition, and signed to the Sony subsidiary DefSTAR Records. \n  Their debut single, "Mr. Raindrop", was used as the second ending theme for the anime Gintama. \n  Their debut album, Turn It Up!, was released on 2 August',
      photoUrl: "https://i1.jpopasia.com/assets/1/24402-amplified-3ooa.jpg",

      createdAt: "2023-06-24T14:58:57.290Z",
      updatedAt: "2023-06-24T14:58:57.290Z",
      genres: [
        {
          id: 1,
          name: "Pop",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 1,
            GenreId: 1,
          },
        },
        {
          id: 2,
          name: "Rock",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 1,
            GenreId: 2,
          },
        },
        {
          id: 3,
          name: "Punk",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 1,
            GenreId: 3,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Beyond",
      gigRate: 3000,
      description:
        "Beyond was a Hong Kong rock band formed in 1983. \n    The band became prominent in Hong Kong, Taiwan, Japan, Singapore, Malaysia, Mainland China, and Overseas Chinese communities. \n    The band is widely considered as the most successful and influential Cantopop band from Hong Kong.",
      photoUrl:
        "https://i.discogs.com/rzyFTbxdgFH8gl734ibwwqlKZagRPQ5iu_XCQfMwbIU/rs:fit/g:sm/q:90/h:821/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTIyNjgw/MjMtMTYxMTAyODc5/My00MDQ5LmpwZWc.jpeg",
      createdAt: "2023-06-24T14:58:57.290Z",
      updatedAt: "2023-06-24T14:58:57.290Z",
      genres: [
        {
          id: 1,
          name: "Pop",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 2,
            GenreId: 1,
          },
        },
        {
          id: 2,
          name: "Rock",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 2,
            GenreId: 2,
          },
        },
      ],
    },
    {
      id: 3,
      name: "Ella Fitzgerald",
      gigRate: 5000,
      description:
        'Ella Jane Fitzgerald was an American jazz singer, sometimes referred to as the "First Lady of Song", "Queen of Jazz", and "Lady Ella". \n    She was noted for her purity of tone, impeccable diction, phrasing, timing, intonation, and a "horn-like" improvisational ability, particularly in her scat singing.',
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Ella_Fitzgerald_1962.JPG",
      createdAt: "2023-06-24T14:58:57.290Z",
      updatedAt: "2023-06-24T14:58:57.290Z",
      genres: [
        {
          id: 4,
          name: "Jazz",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 3,
            GenreId: 4,
          },
        },
        {
          id: 6,
          name: "Blues",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 3,
            GenreId: 6,
          },
        },
      ],
    },
  ];
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
        Our Musicians
      </Typography>
      <Grid container spacing={2} my={1}>
        <BandCard props={bands[0]} />
        <BandCard props={bands[1]} />
        <BandCard props={bands[2]} />
      </Grid>
    </Stack>
  );
};

export default BandListingPage;
