import { ProfileList } from "./features/profile/ProfileList";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Status } from "./components/Status";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProfileShow } from "./features/profile/ProfileShow";
import { ProfileAddEdit } from "./features/profile/ProfileAddEdit";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { darkmode } from "./features/settings/settingsSlice";
import { useAppDispatch } from "./store";
import { fetchProfiles } from "./features/profile/profileSlice";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#b4c1e5",
    },
    primary: {
      main: "#011f3e",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#434a5e",
    },
    primary: {
      main: "#011f3e",
    },
  },
});

function App() {
  const isDarkMode = useSelector(darkmode);
  const dispatch = useAppDispatch();
  dispatch(fetchProfiles());

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
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
