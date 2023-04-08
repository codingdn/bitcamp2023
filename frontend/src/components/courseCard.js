import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function CourseCard(props) {
  console.log("this is course data");
  console.log(props);
  return (
    <Card>
              <h3>{props.course.course_id}</h3>
      <CardContent>
        <h3>Some Card Here</h3>
        <h3>{props.course.course_id}</h3>
        {/* <h5>
          {courseData.course_id} - {courseData.name}
        </h5>
        <p>Department: {courseData.dept_id}</p>
        <p>{courseData.description}</p>
        <ul>
          <li>Prereqs: {courseData.prereqs}</li>
          <li>Restrictions: {courseData.restrictions}</li>
          <li>Additional Info: {courseData.additional_info}</li>
          <li>Credit Granted For: {courseData.credots_granted_for}</li>
        </ul> */}
        {/* {courseData.gened.length > 0 ? (
          <div>
            <h3>Gened</h3>
            <ul>
              {courseData.gened.forEach((element) => {
                <p>{element.toString()}</p>;
              })}
            </ul>
          </div>
        ) : (
          ""
        )} */}
      </CardContent>
    </Card>
  );
}

export default CourseCard