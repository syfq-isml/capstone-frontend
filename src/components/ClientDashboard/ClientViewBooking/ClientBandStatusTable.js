import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";

const ClientBandStatusTable = ({ bands, setTempBody }) => {
  const [rankedBands, setRankedBands] = useState([]);

  // sort the bands
  useEffect(() => {
    bands.sort((band1, band2) => {
      return band1.bandBooking.rank - band2.bandBooking.rank;
    });
    setRankedBands(bands);
  }, [bands]);

  return (
    <Box m={2}>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Rank</b>
              </TableCell>
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankedBands.map((band) => {
              return (
                <TableRow
                  key={band.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{band.bandBooking.rank}</TableCell>
                  <TableCell align="center">{band.name}</TableCell>
                  <TableCell align="center">
                    {band.bandBooking.status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientBandStatusTable;
