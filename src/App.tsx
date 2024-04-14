import { ProfileList } from "./features/profile/ProfileList";
import { Box, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { Status } from "./layout/Status";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProfileShow } from "./features/profile/ProfileShow";
import { ProfileAddEdit } from "./features/profile/ProfileAddEdit";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f4b85",
    },
    secondary: {
      main: "#af2ba5",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        sx={{
          boxSizing: "border-box",
          padding: "1em",
          margin: "0 auto",
          maxWidth: "90%",
        }}
      >
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/profile/:profileId" element={<ProfileShow />} />
            <Route path="/add" element={<ProfileAddEdit />} />
            <Route path="/edit/:profileId" element={<ProfileAddEdit />} />
          </Routes>
        </BrowserRouter>
        <Status />
      </Box>
    </ThemeProvider>
  );
}

export default App;
