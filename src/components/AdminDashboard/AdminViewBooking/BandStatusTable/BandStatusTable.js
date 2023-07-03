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

import StatusSelect from "./StatusSelect";

const BandStatusTable = ({ bands, setTempBody }) => {
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
              <TableCell>Rank</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Status</TableCell>
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
                  <TableCell component="th" scope="row">
                    {band.bandBooking.rank}
                  </TableCell>
                  <TableCell align="right">{band.name}</TableCell>
                  <TableCell align="right">{band.phoneNumber}</TableCell>
                  <TableCell align="right">{band.email}</TableCell>
                  <TableCell align="right">
                    <StatusSelect
                      currentStatus={band.bandBooking.status}
                      setTempBody={setTempBody}
                      id={band.bandBooking.id}
                    />
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

export default BandStatusTable;
