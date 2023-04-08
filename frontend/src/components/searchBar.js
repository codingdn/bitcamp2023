import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//data jsons to store majors and courses at universities
import dept from "../data/department_codes.json"
import courseCode from "../data/course_id.json"


function SearchBar(props) {
    return (
      <>
        <Autocomplete
          multiple
          value={props.values}
          disabled={props.isDisabled}
          options={
            props.isDisabled
              ? []
              : props.searchType === "major"
              ? dept.departments
              : courseCode.courses
          }
          getOptionLabel={(option) =>
            props.searchType === "major" ? option.dept_id : option.course_id
          }
          sx={{ width: 600 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.searchType === "major" ? "Major" : "Courses"}
            />
          )}
          onChange={(event, newValues) => {
            props.setValue([...newValues]);
          }}
        />
      </>
    );
}

export default SearchBar;