import styled from "styled-components";
import { RowWrapper } from "../../../reusable/styled-components";

type PropsType = {
  hasLiveConnection: boolean;
  setHasLiveConnection: React.Dispatch<React.SetStateAction<boolean>>;
};

const LiveConection = (props: PropsType) => {
  return (
    <LiveConnectionComponent className="liveComponent">
      <PulsingCircle />
      <LiveText>Live Data</LiveText>
    </LiveConnectionComponent>
  );
};

export default LiveConection;

const LiveConnectionComponent = styled(RowWrapper)`
  position: relative;
  column-gap: 5px;
`;

const LiveText = styled.p`
  color: #d70040;
  margin: 0px;
`;

const PulsingCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: #d70040;
  border-radius: 50%;
  margin-top: 2px;

  &:before {
    content: "";
    position: relative;
    display: block;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 45px;
    background-color: #d70040;
    animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  /* &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  } */

  @keyframes pulse-ring {
    0% {
      transform: scale(0.33);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    /* 0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    } */
  }
`;
