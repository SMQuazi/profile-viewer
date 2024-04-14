import {
  Button,
  Grid,
  InputAdornment,
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
import {
  Email,
  Home,
  LocationCity,
  LocationOn,
  NoteAdd,
  Person,
  Phone,
  Photo,
} from "@mui/icons-material";

const ProfileAddEdit = () => {
  const theme = useTheme();
  const { profileId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profiles: Profile[] = useSelector(profilesState);
  const current: Profile | null = useSelector(profileInFocus);

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
          (formProfile?.phone.length === 10 ||
            formProfile?.phone.length === 12) &&
          formProfile?.email &&
          formProfile?.email.match(/^\S+@\S+\.\S+$/) &&
          formProfile?.address &&
          formProfile?.city &&
          formProfile?.state &&
          formProfile?.zip &&
          formProfile?.zip.length === 5
      )
    );
  }, [formProfile]);

  const InputChanged = (name: string, value: any): void => {
    if (name === "zip") {
      if (value?.match(/[^0-9.]/g)) {
        return;
      }
    }
    if (name === "phone") {
      if (value?.match(/[^0-9.]/g)) {
        return;
      }
    }
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

  const textfieldsData = [
    {
      id: "first_name",
      icon: <Person />,
    },
    {
      id: "last_name",
      icon: <Person />,
    },
    {
      id: "address",
      xsWidth: 5,
      icon: <Home />,
    },
    {
      id: "city",
      xsWidth: 3,
      icon: <LocationCity />,
    },
    {
      id: "state",
      xsWidth: 2,
      isSelect: true,
      options: US_States,
    },
    {
      id: "zip",
      xsWidth: 2,
      maxLength: 5,
      icon: <LocationOn />,
    },
    {
      id: "phone",
      maxLength: 10,
      type: "tel",
      icon: <Phone />,
      onblur: () => {
        let phone = formProfile.phone;
        if (phone?.length === 10) {
          phone =
            phone.substring(0, 3) +
            "-" +
            phone.substring(3, 6) +
            "-" +
            phone.substring(6, 10);
        }
        setFormProfile({ ...formProfile, phone });
      },
      onfocus: () => {
        const phone = formProfile.phone?.replaceAll("-", "");
        setFormProfile({ ...formProfile, phone });
      },
    },
    {
      id: "email",
      icon: <Email />,
    },
    {
      id: "photo",
      optional: true,
      icon: <Photo />,
    },
    {
      id: "notes",
      optional: true,
      icon: <NoteAdd />,
    },
  ];

  const dataIdToLabel = (text: string) =>
    text
      .split("_")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");

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

          {textfieldsData.map((fieldData) => {
            return (
              <Grid item xs={fieldData.xsWidth || 6} key={fieldData.id}>
                <TextField
                  type={fieldData.type || "text"}
                  select={fieldData.isSelect}
                  label={dataIdToLabel(fieldData.id)}
                  fullWidth
                  required={!fieldData.optional}
                  onChange={(e) => InputChanged(fieldData.id, e.target.value)}
                  value={formProfile?.[fieldData.id] || ""}
                  inputProps={{
                    maxLength: fieldData.maxLength || 255,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {fieldData.icon}
                      </InputAdornment>
                    ),
                  }}
                  onBlur={fieldData.onblur || undefined}
                  onFocus={fieldData.onfocus || undefined}
                >
                  {fieldData.isSelect &&
                    fieldData.options?.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            );
          })}

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
