import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box"
import Modal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';


function CourseCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
    >
      <Card
        sx={{
          height: "100px",
        }}
      >
        <CardActions onClick={handleOpen}>
          <h3>
            {props.course.course_id} <br /> {props.course.name}
          </h3>
        </CardActions>

        {/**Popup when card is clicked to see more information  */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
          >
            <Card
              sx={{
                width: 700,
                padding: "20px",
              }}
            >
              <h3>{props.course.course_id}</h3>
              <p>{props.course.description}</p>
              <ul>
                <li>Prereqs: {props.course.prereqs}</li>
                {!props.course.restrictions === "" ? (
                  <li>Restrictions: {props.course.restrictions}</li>
                ) : null}
                <li>Additional Info: {props.course.additional_info}</li>
                <li>Credit Granted For: {props.course.credit_granted_for}</li>
                {/* {props.course.gened.length > 0 ? (
                  <li>Gened: {props.course.gened.toString()}</li>
                ) : null} */}
              </ul>
            </Card>
          </Box>
        </Modal>
      </Card>
    </Box>
  );
}

export default CourseCard