import React, { useState, useEffect} from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NextButton from "./components/NextButton";
// import SubmitButton from "./components/SubmitButton";
import TextField from "@mui/material/TextField";
// import sample from "./data/sample_class.json";
// import ListCourses from "./components/ListCourses";
import Box from "@mui/material/Box";
// import { radioClasses, Typography } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
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
// const ClassesContext = createContext({
//   classes: [], fetchClasses: () => {}
// }
// )
// const SearchContext = createContext({
//   searches: [], fetchSearches: () => {}
// })

//Entry point for application
function App() {
  const [majors, setMajors] = useState([]);
  const [takenCourses, setTakenCourses] = useState([]);
  const [toCourses, setToCourses] = useState(false);
  const [toFindCourses, SetToFindCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [loadCourseCards, setLoadCourseCards] = useState(false);
  // const [recommendedCourses, setRecommendCourses] = useState(sample.data);
  // const [recommendedCourses, setRecommendCourses] = useState([]);

  // const { sessionDetails, setSessionDetails } = useContext(SessionContext);

  const [classes, setClasses] = useState([]);
  // const [searches, setSearches] = useState([]);

  // const fetchClasses = async () => {
  //   const response = await fetch("http://localhost:8000/course/");
  //   const classes = await response.json();
  //   console.log(classes);

  //   // setRecommendCourses(classes.data);
  //   setClasses(classes.data);
  // };

  // const fetchSearches = async () => {
  //   const response = await fetch("http://localhost:8000/search/");
  //   const searches = await response.json();
  //   console.log(searches);

  //   // setRecommendCourses(classes.data);
  //   setSearches(searches);
  // };

  useEffect(() => {
    console.log(classes)
  }, [classes]);

  const handleSubmit = async (event) => {
    setLoadCourseCards(!loadCourseCards);

    // const newSessionInfo = {
    //   id: 1,
    //   course_id: "AASP107",
    //   name: "Introduction to African American Studies",
    //   dept_id: "AASP",
    //   description:
    //     "Significant aspects of the history of African Americans with particular emphasis on the evolution and development of black communities from slavery to the present. Interdisciplinary introduction to social, political, legal and economic roots of contemporary problems faced by blacks in the United States with applications to the lives of other racial and ethnic minorities in the Americas and in other societies.",
    //   gened: [["DSHS", "DVUP"]],
    //   restriction: "Permission of BSOS-African American Studies department.",
    //   additional_info: "Cross-listed with: WGSS265.",
    //   prereqs: "AASP101; and (ECON201 or ECON200).",
    //   credit_granted_for: "WMST265, AASP298B, WGSS265 or AASP265.",
    // };

    const newSearch = {
      "query": courseSearch
    }

    // fetch("http://localhost:8000/course/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newSessionInfo),
    // }).then(fetchClasses);

    const results = await fetch("http://localhost:8000/search/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSearch),
      // body: JSON.stringify(newSearch),
    });

    const resultsData = await results.json();

    console.log(resultsData);
    setClasses(resultsData);
  };

  return (
    // <SessionContext.Provider
    //   value={{ recommendedCourses, fetchRecommendedCourses }}
    // >
    // <ClassesContext.Provider value={{ classes, fetchClasses }}>
      <div className="App">
        <div className="logo">
          <img alt="logo" width="70px" height="70px" src={logo} />
        </div>
        <h1>RecommendMe</h1>

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
              {/* {loadCourseCards && recommendedCourses.length === 0 ? (
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
              )} */}

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
              {/* <ListCourses courses={classes} /> */}

              {/* <h2>Recent Searches:</h2>
              <ul>
                {searches.map((search, index) => (
                  <li>{search.name}</li>
                ))}
              </ul> */}

              {/* {loadCourseCards && recommendedCourses.length > 0 ? (
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
              )} */}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    // </ClassesContext.Provider>
  );
}

export default App;
