import React from 'react';
import CourseCard from './CourseCard';

const ListCourses = ({ courses }) => {
  return (
    <ul>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </ul>
  );
};

export default ListCourses;