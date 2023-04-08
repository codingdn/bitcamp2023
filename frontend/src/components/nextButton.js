import React from 'react'
import Button from '@mui/material/Button';


function NextButton(props) {
  return (
    <Button variant="contained" onClick={(event) => {
      props.setValue(!props.value)
    }}>{!props.value ? "Next" : "Previous"}</Button>
  )
}

export default NextButton