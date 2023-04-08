import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/SearchBar';
import NextButton from './components/NextButton';
import TextField from '@mui/material/TextField';


function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [findCourses, setFindCourses] = useState(false);

  useEffect(() => {
    console.log(majors);
    console.log(takenCourses)
  }, [majors, takenCourses]);

  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h2>Insert Major(s) (Department Code)</h2>
      <SearchBar searchType="major" values={majors} setValue={setMajors} isDisabled={toCourses}/>
      <NextButton value={toCourses} setValue={setToCourses} />
      <div>
        {toCourses ? (
          <>
            <h2>Select Taken Courses</h2>
            <SearchBar
              searchType="takenCourses"
              values={takenCourses}
              setValue={setTakenCourses}
              isDisabled={findCourses}
            />
            <NextButton value={findCourses} setValue={setFindCourses} />
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        {findCourses ? (
          <>
            <h3>Find Courses</h3>
            <TextField
              id="outlined-basic"
              label="Search Courses"
              variant="outlined"
              placeholder="e.g. Recommend me a course that teaches artificial intelligence"
              multiline
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
