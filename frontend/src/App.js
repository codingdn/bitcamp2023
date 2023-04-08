import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/searchBar';
import NextButton from './components/nextButton';
import TextField from '@mui/material/TextField';


function App() {
  const [majors, setMajors] = useState(["some default val", "val 3"]);
  const [toCourses, setToCourses] = useState(false);
  const [findCourses, setFindCourses] = useState(false);

  useEffect(() => {
    console.log(majors);
  }, [majors]);

  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h2>Insert Major (Department Code)</h2>
      <SearchBar searchType="major" values={majors} setValue={setMajors} />
      <NextButton value={toCourses} setValue={setToCourses} />
      <div> 
        {toCourses ?
          <>
            <SearchBar searchType="major" values={majors} setValue={setMajors} />
            <NextButton value ={findCourses} setValue={setFindCourses}/>
          </> : ""
        }
      </div>
      <div>
        {findCourses ?
          <>
            <h3>Find Courses</h3>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </> : ""
        }
      </div>
    </div>
  );
}

export default App;
