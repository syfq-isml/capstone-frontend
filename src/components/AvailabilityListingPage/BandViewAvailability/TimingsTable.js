import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";

import { formatDateDisplay } from "../../utils/formatDate";

const TimingsTable = ({ timeslots, handleDelete }) => {
  return (
    <Box m={2}>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Start</b>
              </TableCell>
              <TableCell align="center">
                <b>End</b>
              </TableCell>
              <TableCell align="center">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeslots.map((timeslot) => {
              return (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  key={timeslot.id}
                >
                  <TableCell align="center">
                    {formatDateDisplay(timeslot.startBlockedTiming)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDateDisplay(timeslot.endBlockedTiming)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ minHeight: 0, minWidth: "2em", padding: 0 }}
                      onClick={() => {
                        handleDelete(timeslot.id);
                      }}
                    >
                      🗑️
                    </Button>
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

export default TimingsTable;
