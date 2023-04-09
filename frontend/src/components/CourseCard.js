import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CardContent } from "@mui/material";
import _ from "lodash";

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
          // height: "170px",
          width: "300px",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            background: "linear-gradient(to top, #dd5e89, #f7bb97)",
          }}
          onClick={handleOpen}
        >
          <div>
            <h3>{props.course.course_id}</h3>
            <p>{props.course.name}</p>
          </div>
        </CardContent>
      </Card>

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
          position="absolute"
          top="35%"
          left="30%"
        >
          <Card
            sx={{
              width: 700,
              padding: "20px",
            }}
          >
            <h3>
              {props.course.course_id} - {props.course.name}
            </h3>
            <p>
              {!_.isEmpty(props.course.description)
                ? props.course.description
                : "Whoop, looks like this class does not have a description 😔"}
            </p>
            <ul>
              {!_.isEmpty(props.course.prereqs) ? (
                <li>Prereqs: ${props.course.prereqs} </li>
              ) : null}
              {!_.isEmpty(props.course.restrictions) ? (
                <li>Restrictions: ${props.course.restrictions} </li>
              ) : null}
              {!_.isEmpty(props.course.additional_info) ? (
                <li>Additional Info: {props.course.additional_info}</li>
              ) : null}
              {!_.isEmpty(props.course.credit_granted_for) ? (
                <li>Credit Granted For: {props.course.additional_info}</li>
              ) : null}
              {props.course.gen_ed !== "[]" ? (
                <li>Gened: {props.course.gen_ed}</li>
              ) : null}
            </ul>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}

export default CourseCard;
