import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StatusSelect from "./StatusSelect";

import { useEffect, useState } from "react";

const BandStatusTable = ({ bands }) => {
  const [submitBody, setSubmitBody] = useState({});

  useEffect(() => {
    const submitBodyTemp = {};
    let i = 1;
    bands.map((band) => {
      submitBodyTemp[`bandBooking${i}Id`] = band.bandBooking.id;
      submitBodyTemp[`band${i}Status`] = band.bandBooking.status;
      i++;
    });

    /* create submitBody in this format
  const obj = {
    bandBooking1Id: 28,
    band1Status: "Confirmed",
    bandBooking2Id: 29,
    band2Status: "Not Contacted",
    bandBooking3Id: 30,
    band3Status: "Rejected",
  };*/

    setSubmitBody(submitBodyTemp);
  }, [bands]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {bands.map((band) => {
            return (
              <TableRow
                key={band.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {band.bandBooking.rank}
                </TableCell>
                <TableCell align="right">{band.name}</TableCell>
                <TableCell align="right">{band.phoneNumber}</TableCell>
                <TableCell align="right">{band.email}</TableCell>
                <TableCell align="right">
                  <StatusSelect currentStatus={band.bandBooking.status} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BandStatusTable;
