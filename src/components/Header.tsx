import { AppBar, Link, Stack } from "@mui/material";
import RivetLogo from "../assets/rivet.png";

const Header = () => {
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
          <h1>Welcome to Rivet</h1>
        </Stack>
      </AppBar>
    </header>
  );
};

export default Header;
