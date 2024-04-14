import { AppBar, IconButton, Link, Stack, Tooltip } from "@mui/material";
import RivetLogo from "../assets/rivet.png";
import { DarkMode } from "@mui/icons-material";
import { useAppDispatch } from "../store";
import { toggleDarkMode } from "../features/settings/settingsSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleDarkModeClick = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="App-header" style={{ textAlign: "center" }}>
      <AppBar position="fixed" sx={{ margin: 0, padding: 0 }}>
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: "16px 32px" }}
        >
          <Link href="/">
            <img src={RivetLogo} alt="logo" width={30} />
          </Link>
          <h1>RIVET Employees</h1>
          <Tooltip title="Toggle Dark Mode">
            <IconButton color="inherit" onClick={handleDarkModeClick}>
              <DarkMode />
            </IconButton>
          </Tooltip>
        </Stack>
      </AppBar>
    </header>
  );
};

export default Header;
