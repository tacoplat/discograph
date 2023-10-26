import axios from "axios";

const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  timeout: 30000,
});

const spotifyBaseInstance = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 30000,
});

const defaultAuthParams = (token) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getTest = () =>
  baseInstance
    .get("/test")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

export const getTopTracks = (token) =>
  spotifyBaseInstance
    .get("/me/top/tracks?time_range=short_term", defaultAuthParams(token))
    .then((res) => res)
    .catch((err) => console.log(err));

export const getRecommendations = (token, seedTrack) =>
  spotifyBaseInstance
    .get(
      `/recommendations?seed_artists=${seedTrack.artists
        .map((artist) => artist.id)
        .join(",")}&seed_tracks=${seedTrack.id}`,
      defaultAuthParams(token)
    )
    .then((res) => res)
    .catch((err) => console.log(err));
