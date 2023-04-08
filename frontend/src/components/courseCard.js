import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box"

function CourseCard(props) {
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
    >
      <Card
        sx={{
          width: 600,
        }}
      >
        <CardContent>
          <h3>
            {props.course.course_id} - {props.course.name}
          </h3>
          <p>{props.course.description}</p>
          <ul>
            <li>Prereqs: {props.course.prereqs}</li>
            {!props.course.restrictions === "" ? (
              <li>Restrictions: {props.course.restrictions}</li>
            ) : null}
            <li>Additional Info: {props.course.additional_info}</li>
            <li>Credit Granted For: {props.course.credit_granted_for}</li>
            {props.course.gened.length > 0 ? (
              <li>Gened: {props.course.gened.toString()}</li>
            ) : null}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CourseCard