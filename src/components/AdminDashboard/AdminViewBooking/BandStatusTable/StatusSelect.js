import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

export default function StatusSelect({ currentStatus, setTempBody, id }) {
  const [status, setStatus] = useState("Not Contacted");

  useEffect(() => {
    setStatus(currentStatus);
  }, []);

  const handleChange = (event) => {
    setStatus(event.target.value);
    setTempBody((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Select value={status} onChange={handleChange}>
          <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
          <MenuItem value={"Not Contacted"}>Not Contacted</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
