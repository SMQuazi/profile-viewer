type Profile = {
  id: number;
  first_name: string; // 255 char max / required",
  last_name: string; // 255 char max / required",
  phone: string; // 255 char max / required",
  email: string; // 255 char max / required",
  address: string; // 255 char max / required",
  city: string; // 255 char max / required",
  state: string; // 255 char max / required",
  zip: string; // 255 char max / required",
  photo: string | null; // 255 char max / URL to image file",
  notes: string | null; // 4GB max" //TODO ???
};

type ProfileState = {
  profiles: { [index: string]: Profile };
  inFocus: Profile | null;
};

export const US_States = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const profileAddress = (profile: Profile) => {
  return `${profile.address}, ${profile.city}, ${profile.state} ${profile.zip}`;
};

export { type Profile, type ProfileState };
