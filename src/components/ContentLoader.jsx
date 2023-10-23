import { useEffect, useState } from "react";
import styled from "styled-components";
import { Disc } from "./Disc";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { colors } from "./shared/colors";

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
      props.show > 1 && "0.5s linear 0s 1 normal both running hide, "}
    1.4s ease-out 0s 1 fadeIn;
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

export const ContentLoader = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    setRecords([
      {
        id: 1,
        background:
          "https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg",
      },
    ]);
  }, []);
  return (
    <ContentLoaderBase>
      <Instructions show={records.length}>
        <h1>DISCOGRAPH</h1>
        <h3>Click the record to start.</h3>
        <BouncingArrow />
      </Instructions>
      {records.map((record) => (
        <Disc
          disc={record}
          onClick={() => {
            setRecords([...records, { id: record.id + 1 }]);
          }}
        />
      ))}
    </ContentLoaderBase>
  );
};
