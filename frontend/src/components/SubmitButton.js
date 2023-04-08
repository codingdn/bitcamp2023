import React from 'react'
import Button from '@mui/material/Button';


function SubmitButton(props) {
  return (
    <Button
      variant="contained"
      onClick={(event) => {
        props.setValue(!props.value);
      }}
    >
      Submit
    </Button>
  );
}

export default SubmitButton