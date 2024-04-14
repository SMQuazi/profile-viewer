import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Profile, US_States } from "./profileUtils";
import { useNavigate, useParams } from "react-router-dom";
import {
  profileInFocus,
  editProfile,
  profilesState,
  setActiveProfile,
  addProfile,
} from "./profileSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";

const ProfileAddEdit = () => {
  const theme = useTheme();
  const { profileId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profiles: Profile[] = useSelector(profilesState);
  const current: Profile | null = useSelector(profileInFocus);

  // TODO define NEW Profile
  const [formProfile, setFormProfile] = useState<any>({
    state: US_States[0],
  });
  const [isValid, setIsValid] = useState<Boolean>(false);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);

  useEffect(() => {
    if (profileId) {
      setEditMode(true);
      if (!current) {
        dispatch(setActiveProfile(Number(profileId)));
      } else {
        setFormProfile(current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles, current]);

  useEffect(() => {
    setIsValid(
      // TODO improve validation
      Boolean(
        formProfile?.first_name &&
          formProfile?.last_name &&
          formProfile?.phone &&
          formProfile?.email &&
          formProfile?.address &&
          formProfile?.city &&
          formProfile?.state &&
          formProfile?.zip
      )
    );
  }, [formProfile]);

  const InputChanged = (name: string, value: any): void => {
    setFormProfile({ ...formProfile, [name]: value });
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    let navTo = "";
    let res: any = {};

    if (editMode) {
      //Use EDIT Profile Endpoint and go back to profile view
      navTo = `/profile/${profileId}`;
      res = await dispatch(editProfile(formProfile));
    } else {
      //Use ADD Profile Endpoint and go back to list view
      navTo = "/";
      res = await dispatch(addProfile(formProfile));
    }

    // If res has error, set error message and return to NOT navigate.
    if (res.error) {
      let errorMsg = `An error has occurred.`;
      res.payload.errors?.forEach(
        (error: any) => (errorMsg += ` | ${error.param} - ${error.msg}`)
      );
      console.error(errorMsg);
      setErrorMsg(errorMsg);
      return;
    }

    navigate(navTo);
  };

  const handleCancel = () => {
    if (editMode) {
      navigate(`/profile/${profileId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Paper
        sx={{
          padding: 8,
          marginTop: 10,
          borderRadius: 5,
        }}
      >
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sx={{ marginBottom: 4 }}>
            <Typography variant="h3">
              {editMode ? "Edit Profile" : "Add a Profile"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              onChange={(e) => InputChanged("first_name", e.target.value)}
              value={formProfile?.first_name || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              required
              onChange={(e) => InputChanged("last_name", e.target.value)}
              value={formProfile?.last_name || ""}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Street Address"
              fullWidth
              required
              onChange={(e) => InputChanged("address", e.target.value)}
              value={formProfile?.address || ""}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="City"
              fullWidth
              required
              onChange={(e) => InputChanged("city", e.target.value)}
              value={formProfile?.city || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              select
              label="State"
              fullWidth
              defaultValue={US_States[0]}
              required
              onChange={(e) => InputChanged("state", e.target.value)}
              value={formProfile?.state || ""}
            >
              {US_States.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Zip Code"
              fullWidth
              required
              onChange={(e) => InputChanged("zip", e.target.value)}
              value={formProfile?.zip || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              fullWidth
              required
              onChange={(e) => InputChanged("phone", e.target.value)}
              value={formProfile?.phone || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email Address"
              fullWidth
              required
              onChange={(e) => InputChanged("email", e.target.value)}
              value={formProfile?.email || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Photo URL"
              fullWidth
              onChange={(e) => InputChanged("photo", e.target.value)}
              value={formProfile?.photo || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Notes"
              fullWidth
              onChange={(e) => InputChanged("notes", e.target.value)}
              value={formProfile?.notes || ""}
            />
          </Grid>

          <Grid container sx={{ marginTop: 2, padding: 2 }} spacing={4}>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1" color={theme.palette.error.main}>
            {errorMsg}
          </Typography>
        </Grid>
      </Paper>
    </>
  );
};

export { ProfileAddEdit };
