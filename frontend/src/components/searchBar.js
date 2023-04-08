import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import majors from '../data/majors.json';

function searchBar() {
    return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={majors.majors}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      );
}

export default searchBar