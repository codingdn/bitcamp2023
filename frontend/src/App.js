import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/searchBar';
import NextButton from './components/nextButton';
// import "cards" array
import CourseCard from './components/courseCard'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [findCourses, setFindCourses] = useState(false);
  const [cards, setCards] = useState([]);
  const [desc, setDesc] = useState("");

  const descriptionChange = event => setDesc(event.target.value)

  // add cards after pressing enter on text box
  function enterPress(e) {
    if (e.key === "Enter") {
      setCards([CourseCard("CMSC430", "Compilers", "Cool course!")])
    }
  }

  useEffect(() => {
    console.log(majors);
    console.log(takenCourses)
  }, [majors, takenCourses]);

  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h2>Insert Major(s) (Department Code)</h2>
      <SearchBar searchType="major" values={majors} setValue={setMajors} />
      <NextButton value={toCourses} setValue={setToCourses} />
      <div>
        {toCourses ? (
          <>
            <h2>Select Taken Courses</h2>
            {/* <SearchBar
              searchType="takenCourses"
              values={takenCourses}
              setValue={setTakenCourses}
            /> */}
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
              label="Outlined"
              variant="outlined"
              value={desc}
              onChange={descriptionChange}
              onKeyDown={enterPress}
            />
            <Button variant="contained" onClick={() => [setCards([]), setDesc("")]}>Clear</Button>
          </>
        ) : (
          ""
        )}
      </div>

      {/* add cards */}
      <div>
          {desc !=="" ? (
            cards.map(card => <>{card}</>)

          ) : (
            ""
          )}
      </div>
      

    </div>
  );
}

export default App;
