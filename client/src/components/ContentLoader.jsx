import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Disc } from "./Disc";
import { colors } from "./shared/colors";
import { ProviderContext } from "./ProviderContext";
import { getRecommendations, getTopTracks } from "../requests/spotify";

const NoSelect = styled.div`
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ContentLoaderBase = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 4rem;
  font-family: "Inter Tight", sans-serif;
`;

const Instructions = styled(NoSelect)`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
      max-height: 100%;
    }
    99% {
      opacity: 0.01;
      max-height: 1%;
    }
    100% {
      opacity: 0;
      max-height: 0%;
      visiblity: hidden;
    }
  }
  width: 100%;
  text-align: center;
  animation: ${(props) =>
      props.show > 1 && "0.3s linear 0s 1 normal both running hide, "}
    0.3s ease-out 0s 1 fadeIn;
`;

const BouncingArrow = styled(KeyboardDoubleArrowDownIcon)`
  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(0.5rem);
    }
    100% {
      transform: translateY(0px);
    }
  }
  color: ${colors.accent};
  margin-top: 1rem;
  animation: 1s infinite bounce;
`;

const randomInt = (low, high) => Math.floor(Math.random() * (high - low) + low);

export const ContentLoader = () => {
  const [records, setRecords] = useState([]);

  const { authed, getToken } = useContext(ProviderContext);
  const token = getToken();

  useEffect(() => {
    async function updateRecords() {
      if (authed) {
        const tracks = (await getTopTracks(token))?.data;
        console.log(tracks);
        if (tracks) {
          setRecords(tracks.items.slice(0, 5));
        }
      }
    }
    updateRecords();
  }, [authed, token]);

  return (
    <ContentLoaderBase>
      <Instructions show={records.length}>
        <h1>DISCOGRAPH</h1>
        <h3>Click the record to start.</h3>
        <BouncingArrow />
      </Instructions>
      {!authed && (
        <Disc
          disc={{}}
          onClick={() => {
            window.location.assign(`${process.env.REACT_APP_API_URI}/login`);
          }}
        />
      )}
      {authed &&
        records.map((record) => (
          <Disc
            key={record.id}
            disc={record}
            onClick={async () => {
              const recommendations = (await getRecommendations(token, record))
                ?.data;

              const currentIdx = records.findIndex(
                (track) => track.id === record.id
              );
              const newTrack = recommendations.tracks[randomInt(0, 20)];

              const updatedRecords = [...records];
              updatedRecords.splice(currentIdx, 1, newTrack);

              setRecords(updatedRecords);
            }}
          />
        ))}
    </ContentLoaderBase>
  );
};
