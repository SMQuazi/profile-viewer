import { Box } from "@mui/material";
import {
  profilesCount,
  profileInFocus,
} from "../features/profile/profileSlice";
import { useSelector } from "react-redux";

const Status = () => {
  const count = useSelector(profilesCount);
  const current = useSelector(profileInFocus);

  return (
    <Box sx={{ fontSize: "12px", color: "#888", marginTop: "1em" }}>
      {`${count} profile(s)`} {current?.id && ` | Selected: ${current.id}`}
    </Box>
  );
};

export { Status };
