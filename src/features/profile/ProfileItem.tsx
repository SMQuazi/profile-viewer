import {
  Card,
  CardContent,
  CardMedia,
  Grow,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Profile } from "./profileUtils";
import { useNavigate } from "react-router-dom";
import { setActiveProfile } from "./profileSlice";
import { Email, Phone } from "@mui/icons-material";
import Empty from "../../assets/empty.png";
import { useState } from "react";
import { useAppDispatch } from "../../store";

type ProfileItemArgs = {
  profile: Profile;
};

const ProfileItem = ({ profile }: ProfileItemArgs) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
            ":hover": {
              height: "101%",
              width: "101%",
            },
            borderRadius: 2,
            height: "100%",
            width: "100%",
            minWidth: 200,
            transition: "height .1s ease-in, width .1s ease-in",
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
            <Typography gutterBottom variant="h5" component="div">
              {profile.first_name} {profile.last_name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Email />
              <Typography>{profile.email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Phone />
              <Typography>{profile.phone}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grow>
  );
};

export { ProfileItem };
