import React from 'react';
import CourseCard from './CourseCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const ListCourses = ({ courses }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: "20px"}}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {courses.map((course, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListCourses;