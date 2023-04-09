import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NextButton from "./components/NextButton";
import TextField from "@mui/material/TextField";
import ListCourses from "./components/ListCourses";
import Box from "@mui/material/Box";
// import { radioClasses, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "./assets/logo.svg";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#e21833",
    },
    secondary: {
      main: "#000000",
    },
  },
});

//Entry point for application
function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [toFindCourses, SetToFindCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [loadCourseCards, setLoadCourseCards] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(loading);
  }, []);

  const handleSubmit = async (event) => {
    setLoading(true);
    setLoadCourseCards(!loadCourseCards);

    const newSearch = {
      query: courseSearch,
      takenCourses: takenCourses,
      majors: majors,
    };

    const results = await fetch("http://localhost:8000/search/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSearch),
    });

    const resultsData = await results.json();
    setClasses(resultsData.slice(0, 6));

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const handleClear = (event) => {
    setClasses([]);
    setCourseSearch("");
  };

  return (
    <div className="flex-parent-element">
      <div className="flex-child-element section-one-container">
        <div className="section-one">
          <div className="logo">
            <img alt="logo" width="70px" height="70px" src={logo} />
          </div>
          <h1>RecommendMe</h1>
          <p>
            This project solves the issue of students at UMD who do not know
            what classes to take. Searching on Testudo simply returns a query
            based on some specified filters and may not be as helpful. In this
            project, we attempt to mimic LLM and provide the user the ability to
            provide custom inputs on the type of classes that they may be
            interested in.
          </p>
        </div>
      </div>

      <div className="flex-child-element">
        <div>
          <h2 className="section-header">Insert Major(s) (Department Code) </h2>
          <div className="search-section">
            <SearchBar
              searchType="major"
              values={majors}
              setValue={setMajors}
              isDisabled={toCourses}
            />
          </div>
          <NextButton
            value={toCourses}
            setValue={setToCourses}
            isDisabled={majors.length === 0}
          />
          <div>
            {toCourses ? (
              <>
                {/**Input Courses Taken */}
                <h2 className="section-header">Select Taken Courses</h2>
                <div className="search-section">
                  <SearchBar
                    searchType="takenCourses"
                    values={takenCourses}
                    setValue={setTakenCourses}
                    isDisabled={toFindCourses}
                  />
                </div>
                <NextButton
                  value={toFindCourses}
                  setValue={SetToFindCourses}
                  isDisabled={takenCourses.length === 0}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            {toFindCourses ? (
              <>
                {/**Input Search */}
                <h2 className="section-header">Find Courses</h2>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop="20px"
                >
                  <TextField
                    id="course-search"
                    label="Search Courses"
                    variant="outlined"
                    placeholder="e.g. Recommend me a course that teaches artificial intelligence"
                    multiline
                    onChange={(event) => {
                      setCourseSearch(event.target.value);
                    }}
                    sx={{
                      width: 450,
                    }}
                  />
                </Box>

                <ThemeProvider theme={theme}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="20px"
                  >
                    {!(classes.length === 0 && loadCourseCards && loading) ? (
                      <Button
                        variant="contained"
                        onClick={(event) => {
                          handleSubmit(event);
                        }}
                        color="primary"
                        disabled={courseSearch.length === 0 && loading}
                      >
                        Submit
                      </Button>
                    ) : (
                      <CircularProgress />
                    )}
                  </Box>
                  {classes.length !== 0 && !loading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      marginTop="20px"
                    >
                      <Button
                        variant="contained"
                        onClick={(event) => {
                          handleClear(event);
                        }}
                        color="secondary"
                      >
                        Clear
                      </Button>
                    </Box>
                  ) : null}
                </ThemeProvider>
                {/* {!loading && loadCourseCards ? ( */}
                <ListCourses courses={classes} />
                {/* ) : loading && loadCourseCards ? (
                  <CircularProgress />
                ) : null} */}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
