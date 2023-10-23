import { colors } from "./shared/colors";
import styled from "styled-components";

const FlexBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circular = styled(FlexBase)`
  border-radius: 16rem;
`;

const DiscBase = styled(Circular)`
  position: relative;
  height: 12rem;
  width: 12rem;
  background: #27282e;
  border-radius: 16rem;
  border: 1px solid black;
`;

const DiscBackground = styled(DiscBase)`
  @keyframes enter {
    0% {
      transform: scale(0) rotate(0);
    }
    80% {
      transform: scale(1.2) rotate(1turn);
    }
    100% {
      transform: scale(1) rotate(1turn);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }

  animation: 1s ease-out 0s 1 enter;
  transition: transform 0.5s ease-in-out;
  &:hover {
    opacity: 1;
    z-index: 9999;
    animation: 1s ease-out 0s infinite spin, running enter;
  }
`;
//transform: scale(2);translateY(-16rem)

const DiscOverlay = styled.svg`
  position: absolute;
  height: 12rem;
  width: 12rem;
  background: white;
  opacity: 0.1;
  border-radius: 16rem;
  -webkit-filter: invert(1);
  filter: invert(1);
`;

const DiscHole = styled(Circular)`
  height: 4rem;
  width: 4rem;
  background: no-repeat center/100%
    ${(props) =>
      props.background ? `url("${props.background}")` : colors.accent};
  border: 1px solid white;
  z-index: 1;
`;

export const Disc = ({ onClick, disc }) => {
  return (
    <>
      <DiscBackground onClick={onClick}>
        <DiscHole background={disc.background} />
        <DiscOverlay viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon
            points="50 50,
                60 0,
                100 20,
                50 50,
                0 80,
                40 100,
                50 50"
          />
        </DiscOverlay>
      </DiscBackground>
    </>
  );
};
