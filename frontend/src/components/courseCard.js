import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function CourseCard(props) {
  

  return (
    <Card>
      <h3>{props.course.course_id}</h3>
      <CardContent>
        <h5>
          {props.course.course_id} - {props.course.name}
        </h5>
        <p>Department: {props.course.dept_id}</p>
        <p>{props.course.description}</p>
        <ul>
          <li>Prereqs: {props.course.prereqs}</li>
          <li>Restrictions: {props.course.restrictions}</li>
          <li>Additional Info: {props.course.additional_info}</li>
          <li>Credit Granted For: {props.course.credit_granted_for}</li>
        </ul>
        
        {props.course.gened.length > 0 ? (
          <div>
            <h3>Gened</h3>
            <ul>
              {props.course.gened.map((element, idx) => (
                <p>{element.toString()}</p>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}

export default CourseCard