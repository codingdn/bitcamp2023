import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import dept from "../data/department_codes.json"


function SearchBar() {
    return (
      <Autocomplete
        multiple
        options={dept.departments}
        getOptionLabel={(option) => option.dept_id}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Major" />}
      />
    );
}

export default SearchBar;