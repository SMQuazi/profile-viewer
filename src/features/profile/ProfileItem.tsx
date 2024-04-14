import {
  Card,
  CardContent,
  CardMedia,
  Grow,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Profile } from "./profileUtils";
import { useNavigate } from "react-router-dom";
import { setActiveProfile } from "./profileSlice";
import { Email, PhoneAndroid } from "@mui/icons-material";
import Empty from "../../assets/empty.png";
import { useState } from "react";
import { useAppDispatch } from "../../store";

type ProfileItemArgs = {
  profile: Profile;
};

const ProfileItem = ({ profile }: ProfileItemArgs) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [photo, setPhoto] = useState(profile?.photo);
  const [raised, setRaised] = useState(false);

  function trySetProfile(id: number) {
    dispatch(setActiveProfile(id));
    navigate(`/profile/${id}`);
  }

  return (
    <Grow in={true}>
      <Grid
        item
        sx={{ cursor: "pointer" }}
        xs={12}
        sm={6}
        md={3}
        xl={2}
        key={profile.id}
        onClick={() => trySetProfile(profile.id)}
      >
        <Card
          onMouseOver={() => setRaised(true)}
          onMouseOut={() => setRaised(false)}
          raised={raised}
          sx={{
            borderRadius: 2,
            border: "1px #ddd solid",
            height: "100%",
            minWidth: 200,
          }}
        >
          <CardMedia
            component="img"
            image={photo || Empty}
            title="Photo"
            sx={{
              objectFit: "cover",
              height: 200,
              width: 200,
              margin: "auto",
              marginTop: 2,
              borderRadius: "50%",
            }}
            onError={() => setPhoto(Empty)}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="Highlight"
            >
              {profile.first_name} {profile.last_name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Email color="primary" />
              <Typography color={theme.palette.primary.dark}>
                {profile.email}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <PhoneAndroid color="primary" />
              <Typography color={theme.palette.primary.dark}>
                {profile.phone}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grow>
  );
};

export { ProfileItem };
