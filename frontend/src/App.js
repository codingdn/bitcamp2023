import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NextButton from "./components/NextButton";
// import SubmitButton from "./components/SubmitButton";
import TextField from "@mui/material/TextField";
import sample from "./data/sample_class.json";
import ListCourses from "./components/ListCourses";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "./assets/logo.svg";
import Button from "@mui/material/Button";

// import SessionContext from "./context/SessionContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#e21833",
    },
  },
});

//put request for session info to generate recommend courses for a later get request
// const updateSessionInfo = async () => {
//   await fetch(http);
// };

//Entry point for application
function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [toFindCourses, SetToFindCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [loadCourseCards, setLoadCourseCards] = useState(false);
  const [recommendedCourses, setRecommendCourses] = useState(sample.data);
  // const [recommendedCourses, setRecommendCourses] = useState([]);

  // const { sessionDetails, setSessionDetails } = useContext(SessionContext);

  const fetchRecommendedCourses = async () => {
    const response = await fetch("http://localhost:8000/request/");
    const result = await response.json();
    console.log(result);

    setRecommendCourses(result.recommendedCourses);
  };

  useEffect(() => {
    fetchRecommendedCourses();
  }, []);

  const handleSubmit = (event) => {
    setLoadCourseCards(!loadCourseCards);

    const newSessionInfo = {
      courseSearch: courseSearch,
      takenCourses: takenCourses,
      majors: majors,
      recommendedCourses: recommendedCourses,
    };

    console.log(newSessionInfo);

    fetch("http://localhost:8000/request/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSessionInfo),
    }).then(fetchRecommendedCourses);
  };

  return (
    // <SessionContext.Provider
    //   value={{ recommendedCourses, fetchRecommendedCourses }}
    // >
    <div className="App">
      <div className="logo">
        <img alt="logo" width="70px" height="70px" src={logo} />
      </div>
      <h1>RecommendMe</h1>

      {/**Input Major */}
      <h2 className="section-header">Insert Major(s) (Department Code) </h2>
      <div className="search-section">
        <SearchBar
          searchType="major"
          values={majors}
          setValue={setMajors}
          isDisabled={toCourses}
        />
      </div>
      <NextButton value={toCourses} setValue={setToCourses} />
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
            <NextButton value={toFindCourses} setValue={SetToFindCourses} />
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

            {/**Error code if no courses found */}
            {loadCourseCards && recommendedCourses.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
              >
                <Typography sx={{ color: "red" }}>
                  Whoops, something went wrong! Try another search term
                </Typography>
              </Box>
            ) : (
              ""
            )}

            {/* <SubmitButton
              setValue={setLoadCourseCards}
              // onClick={handleSubmit}
            /> */}
            <ThemeProvider theme={theme}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="20px"
              >
                <Button
                  variant="contained"
                  onClick={(event) => {
                    // setLoadCourseCards(!loadCourseCards);
                    handleSubmit(event);
                  }}
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </ThemeProvider>

            {/**Spinner to wait for results*/}
            {loadCourseCards && recommendedCourses.length > 0 ? (
              <ListCourses courses={recommendedCourses} />
            ) : loadCourseCards && recommendedCourses.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="30px"
              >
                <CircularProgress />
              </Box>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
    // </SessionContext.Provider>
  );
}

export default App;
