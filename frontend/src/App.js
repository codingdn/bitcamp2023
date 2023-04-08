import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/SearchBar';
import NextButton from './components/NextButton';
import SubmitButton from './components/SubmitButton';
import TextField from '@mui/material/TextField';
import sample from "./data/sample_class.json";
import ListCourses from "./components/ListCourses";


function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [toFindCourses, SetToFindCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [loadCourseCards, setLoadCourseCards] = useState(false);
  const [recommendedCourses, setRecommendCourses] = useState(sample.data);

  // useEffect(() => {
  //   console.log(majors);
  //   console.log(takenCourses);
  //   console.log(courseSearch);

  //   console.log(recommendedCourses);
  // }, [majors, takenCourses, courseSearch, recommendedCourses]);

  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h2>Insert Major(s) (Department Code)</h2>
      <SearchBar
        searchType="major"
        values={majors}
        setValue={setMajors}
        isDisabled={toCourses}
      />
      <NextButton value={toCourses} setValue={setToCourses} />
      <div>
        {toCourses ? (
          <>
            <h2>Select Taken Courses</h2>
            <SearchBar
              searchType="takenCourses"
              values={takenCourses}
              setValue={setTakenCourses}
              isDisabled={toFindCourses}
            />
            <NextButton value={toFindCourses} setValue={SetToFindCourses} />
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        {toFindCourses ? (
          <>
            <h3>Find Courses</h3>
            <TextField
              id="course-search"
              label="Search Courses"
              variant="outlined"
              placeholder="e.g. Recommend me a course that teaches artificial intelligence"
              multiline
              onChange={(event) => {
                setCourseSearch(event.target.value);
              }}
            />
            <br/>
            <SubmitButton setValue={setLoadCourseCards} />
            {loadCourseCards ? (
              <ListCourses courses={recommendedCourses} />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
