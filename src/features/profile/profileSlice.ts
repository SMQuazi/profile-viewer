import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileState } from "./profileUtils";
import { RootState } from "../../store";
import { isArray } from "lodash";

const initialState = {
  profiles: [],
  inFocus: null,
} as ProfileState;

export const fetchProfiles = createAsyncThunk("users/fetchUsers", async () => {
  const token = process.env.REACT_APP_API_TOKEN;
  if (!token) {
    console.error("No token found!");
    throw new Error("No token found!");
  }

  const res = await fetch("https://codechallenge.rivet.work/api/v1/profiles", {
    headers: { token },
  });
  const profiles = await res.json();

  if (isArray(profiles)) {
    return profiles;
  }
  return [profiles];
});

export const editProfile = createAsyncThunk(
  "users/editUser",
  async (newProfile: Profile, thunkApi) => {
    const token = process.env.REACT_APP_API_TOKEN;
    if (!token) {
      console.error("No token found!");
      throw new Error("No token found!");
    }

    const res = await fetch(
      `https://codechallenge.rivet.work/api/v1/profile/${newProfile.id}`,
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return thunkApi.rejectWithValue(data);
    }
    return data;
  }
);

export const addProfile = createAsyncThunk(
  "users/addUser",
  async (newProfile: Profile, thunkApi) => {
    const token = process.env.REACT_APP_API_TOKEN;
    if (!token) {
      console.error("No token found!");
      throw new Error("No token found!");
    }

    const res = await fetch(`https://codechallenge.rivet.work/api/v1/profile`, {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    });

    const data = await res.json();
    if (!res.ok) {
      return thunkApi.rejectWithValue(data);
    }
    return data;
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      const id: Number = action.payload;

      if (!id) {
        state.inFocus = null;
      }
      const found = state.profiles.find((item) => item.id === id);
      state.inFocus = found || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });

    builder.addCase(editProfile.fulfilled, (state, action) => {
      // After editing is successful, replaces profile in the state and focus
      const profile: Profile = action.payload;
      const newProfiles = state.profiles.map((p) =>
        p.id === profile.id ? profile : p
      );
      return {
        ...state,
        profiles: newProfiles,
        inFocus: profile,
      };
    });

    builder.addCase(addProfile.fulfilled, (state, action) => {
      const profile: Profile = action.payload;
      state.profiles.push(profile);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setActiveProfile } = profileSlice.actions;
export const profilesState = (state: RootState) => state.profile.profiles;
export const profilesCount = (state: RootState) =>
  state.profile.profiles.length as number;
export const profileInFocus = (state: RootState) => state.profile.inFocus;

export default profileSlice.reducer;
