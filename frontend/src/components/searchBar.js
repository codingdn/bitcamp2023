import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import dept from "../data/department_codes.json"
import courseCode from "../data/department_codes.json"


function SearchBar(props) {
    return (
      <>
        <Autocomplete
          multiple
          value={props.values}
          disabled={props.isDisabled}
          options={ props.isDisabled ? [] :
            props.searchType === "major"
              ? dept.departments
              : courseCode.course_id
          }
          getOptionLabel={(option) =>
            props.searchType === "major" ? option.dept_id : option
          }
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.searchType ? "Major" : "Courses"}
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