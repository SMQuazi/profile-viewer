import {
  ChevronLeft,
  Edit,
  Email,
  LocationOn,
  Note,
  Person,
  Phone,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  profileInFocus,
  profilesState,
  setActiveProfile,
} from "./profileSlice";
import { useSelector } from "react-redux";
import { profileAddress } from "./profileUtils";
import Empty from "../../assets/empty.png";
import ActionButton from "../../components/ActionButton";
import { useAppDispatch } from "../../store";

const ProfileShow = () => {
  const { profileId: id } = useParams();
  const dispatch = useAppDispatch();
  const profiles = useSelector(profilesState);
  const current = useSelector(profileInFocus);
  const [photo, setPhoto] = useState(current?.photo);

  useEffect(() => {
    if (!current) {
      dispatch(setActiveProfile(Number(id)));
    }
    setPhoto(current?.photo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, profiles]);

  if (!current) {
    return <Box>No user selected</Box>;
  }

  return (
    <>
      <ActionButton
        link={`/edit/${current.id}`}
        tooltipText={`Edit ${current.first_name} ${current.last_name}'s profile`}
      >
        <Edit sx={{ position: "relative", left: 5, height: 20 }} />
        <Person sx={{ position: "relative", right: 5 }} />
      </ActionButton>
      <Box sx={{ marginTop: 8 }}>
        <Box>
          <Link to="/">
            <Stack direction="row" alignItems="center">
              <ChevronLeft />
              <Typography align="justify">Back</Typography>
            </Stack>
          </Link>
        </Box>
        <Fade in={true}>
          <Card raised>
            <CardMedia
              component="img"
              image={photo || Empty}
              title="Photo"
              sx={{
                objectFit: "cover",
                height: 300,
                width: 300,
                borderRadius: 150,
                margin: "auto",
                marginTop: 4,
                marginBottom: 4,
              }}
              alt={current?.photo || undefined}
              onError={() => setPhoto(Empty)}
            />

            <CardContent>
              <Typography gutterBottom variant="h5">
                {current.first_name} {current.last_name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Email />
                <Typography>{current.email}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <Phone />
                <Typography>{current.phone}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <LocationOn />
                <Typography>{profileAddress(current)}</Typography>
              </Stack>

              {current.notes && (
                <Stack direction="row" alignItems="center">
                  <Note />
                  <Typography>{current.notes}</Typography>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </>
  );
};

export { ProfileShow };
