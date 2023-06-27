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
        'Amplified is a rock band consisting of three young boys from Hong Kong. \n  While from Hong Kong, they are primarily known in Japan. \n  They were discovered through Sony Music Japan\'s International Audition, and signed to the Sony subsidiary DefSTAR Records. \n  Their debut single, "Mr. Raindrop", was used as the second ending theme for the anime Gintama. \n  Their debut album, Turn It Up!, was released on 2 August.',
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
        "https://onecms-res.cloudinary.com/image/upload/v1640967679/8days-migration/beyond-1-data.jpg",
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
    {
      id: 4, // int
      name: "Vetta Quartet", // str
      gigRate: 2000, // int
      description: ` Vetta Quartet is an established ensemble structure of 2 violins, 1 viola and 1 cello – creating a full sound with rich harmonies. Coupled with its visual aesthetics, the String Quartet elegantly reflects the quality of your organisation and event.
The String Quartet is VETTA’s flagship service, and is a well-recognised and sought-after live music band / string quartet for Singapore weddings and corporate events, with consistent bookings months in advance. `, // str
      photoUrl:
        "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png", // str
      genres: [
        {
          id: 7,
          name: "String Quartet",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 4,
            GenreId: 4,
          },
        },
        {
          id: 8,
          name: "Classical",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 4,
            GenreId: 6,
          },
        },
      ], // arr of strs
    },
    {
      id: 5, // int
      name: "Astronauts", // str
      gigRate: 4500, // int
      description: `Inspired by the likes of Jamiroquai, Bruno Mars and D’Angelo, this R&B and funk band is most known for its pumped-up live performances. We loved their debut single, Get Close, a groovy track that’ll make you get off your feet and, well, dance. Throw in a dose of bad-boy charm and you get I’m No Good, the band’s second single. Keep your eyes peeled on their social channels – we’ve heard through the grapevine that a full album is in the works!`, // str
      photoUrl:
        "https://expatliving.sg/wp-content/uploads/2019/04/astronauts-band-local-music-singapore-live-music.jpg", // str
      genres: [
        {
          id: 9,
          name: "Funk",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 5,
            GenreId: 9,
          },
        },
        {
          id: 10,
          name: "RnB",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 5,
            GenreId: 10,
          },
        },
      ], // arr of strs
    },
    {
      id: 6, // int
      name: "Disco Hue", // str
      gigRate: 4000, // int
      description: `This four-piece electronic-pop band – consisting of Sherlyn on vocals, Zie on synths, Billy on drums and Rush on guitar – was formed in 2011. Having launched a chart-topping EP titled Arcade, Disco Hue’s dancey originals are a fab mash of retro-inspired beats and infectious synth licks. Our favourite earworm? Gotta Find You, the band’s first single!`, // str
      photoUrl:
        "https://expatliving.sg/wp-content/uploads/2018/04/singapore-music-disco-hue.jpg", // str
      genres: [
        {
          id: 1,
          name: "Pop",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 6,
            GenreId: 1,
          },
        },
        {
          id: 11,
          name: "Electronic",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 6,
            GenreId: 11,
          },
        },
      ], // arr of strs
    },
    {
      id: 7, // int
      name: "Joie Tan", // str
      gigRate: 1000, // int
      description: `Joie Tan’s musical career began in 2008 on YouTube, amassing over 329,000 views on her Fly Me To The Moon cover. Since then, she has reached an impressive 1,120,000 channel views. Now, she’s just released her first, self-funded album.`, // str
      photoUrl:
        "https://expatliving.sg/wp-content/uploads/2018/04/joie-tan-singapore-singer-music.jpg", // str
      genres: [
        {
          id: 1,
          name: "Pop",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 7,
            GenreId: 1,
          },
        },
        {
          id: 4,
          name: "Jazz",
          createdAt: "2023-06-24T14:58:57.294Z",
          updatedAt: "2023-06-24T14:58:57.294Z",
          band_genres: {
            createdAt: "2023-06-24T14:58:57.296Z",
            updatedAt: "2023-06-24T14:58:57.296Z",
            BandId: 7,
            GenreId: 4,
          },
        },
      ], // arr of strs
    }, // arr of strs
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
        {bands.map((band) => {
          return <BandCard key={band.name} props={band} />;
        })}
      </Grid>
    </Stack>
  );
};

export default BandListingPage;
