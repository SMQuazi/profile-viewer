import { Grid, TextField } from "@mui/material";
import { ProfileItem } from "./ProfileItem";
import { profilesState } from "./profileSlice";
import { useSelector } from "react-redux";
import ActionButton from "../../layout/ActionButton";
import { PersonAdd } from "@mui/icons-material";
import { useState } from "react";

const ProfileList = () => {
  const profiles = useSelector(profilesState);
  const [search, setSearch] = useState("");
  return (
    <>
      <ActionButton link="add" tooltipText="Add a profile">
        <PersonAdd />
      </ActionButton>

      <TextField
        sx={{ marginTop: 10, marginBottom: 4 }}
        label="Search Profiles"
        onChange={(e) => setSearch(e.target.value)}
        variant="filled"
        fullWidth
      />

      <Grid container spacing={4}>
        {profiles.length > 0 &&
          profiles
            .filter(
              (profile) =>
                profile.first_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                profile.last_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((profile) => (
              <ProfileItem profile={profile} key={profile.id} />
            ))}
      </Grid>
    </>
  );
};

export { ProfileList };
