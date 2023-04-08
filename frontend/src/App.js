import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/SearchBar';
import NextButton from './components/NextButton';
import TextField from '@mui/material/TextField';


function App() {
  const [majors, setMajors] = useState(["some default val", "val 3"]);

  useEffect(() => {
    console.log(majors);
  }, [majors]);

  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h2>Insert Major (Department Code)</h2>
      <SearchBar searchType="major" values={majors} setValue={setMajors}/>
      <h3>Selected Major(s):</h3>
      <div>
        <ul>
        {majors.forEach((major) => {
          <li>{major.department}</li>
        })}
        </ul>
      </div>
      <NextButton />

      <h3>Select Courses Taken</h3>
      <SearchBar searchType="major" values={majors} setValue={setMajors}/>
      <NextButton />

      <h3>Find Courses</h3>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
}

export default App;
