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

const BandModal = ({ props, handleOpen, handleClose, open }) => {
  const { name, description, photoUrl, genres, gigRate } = props;

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
          <Typography id="modal-modal-title" variant="h3" my={1}>
            {name}
          </Typography>
          <Image src={photoUrl} height={"15em"} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box textAlign="center" my={2}>
            {genres.map((genre) => {
              return (
                <Chip
                  label={genre.name}
                  key={genre.id + name}
                  className="band-category"
                />
              );
            })}
            <Typography sx={{ mt: 2 }}>Approx. ${gigRate} per event</Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BandModal;
