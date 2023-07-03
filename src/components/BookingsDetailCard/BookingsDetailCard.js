import { Card, Box, Typography } from "@mui/material";

const BookingsDetailCard = ({ title, content }) => {
  return (
    <Box mx={1}>
      <Card elevation={1}>
        <Box p={2}>
          <Box>
            <b>{title}</b>
          </Box>
          <Box m={1}>
            <Typography variant="h5">{content}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default BookingsDetailCard;
