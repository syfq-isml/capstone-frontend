import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import Image from "mui-image";
import "./BandModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const BandModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Learn More</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="band-modal">
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <IconButton aria-label="delete" size="small" onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Vetta Quartet</b>
          </Typography>
          <Image
            src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2016/11/Vetta-Quartet-wedding-bands-in-singapore-900x643.png"
            height={"10em"}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vetta Quartet is an established ensemble structure of 2 violins, 1
            viola and 1 cello – creating a full sound with rich harmonies.
            Coupled with its visual aesthetics, the String Quartet elegantly
            reflects the quality of your organisation and event.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The String Quartet is VETTA’s flagship service, and is a
            well-recognised and sought-after live music band for Singapore
            weddings and corporate events, with consistent bookings months in
            advance.
          </Typography>
          <Box textAlign="center" my={2}>
            <Chip label="String Quartet" className="band-category" />
            <Chip label="Classical" className="band-category" />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BandModal;
