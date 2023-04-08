import React from 'react'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box"

const theme = createTheme({
  palette: {
    primary: {
      main: "#e21833",
    },
  },
});

function SubmitButton(props) {
  return (
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
            props.setValue(!props.value);
          }}
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default SubmitButton