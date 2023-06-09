import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd200",
    },
  },
});

//Next/Previous buttons for autocomplates that will also disable previous autocompletes
function NextButton(props) {
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
          sx={{
            justifyContent: "center",
            color: "white",
          }}
          disabled={props.isDisabled}
        >
          {!props.value ? "Next" : "Previous"}
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default NextButton;
