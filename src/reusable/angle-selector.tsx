import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "./styled-components";

type PropsType = {};

const AngleSelector = (props: PropsType) => {
  //   const { state, updateState, filterName } = props;

  const pointerOneAngle = -90 + 20;
  const pointerTwoAngle = -90 + 90;
  return (
    <AngleSelectorWrapper>
      <div className="semiCircleOuter"></div>
      <div className="semiCircleInner"></div>
      <PointerOne angle={pointerOneAngle}>
        <AngleIndicator>
          {pointerOneAngle + 90}
          {"\u00b0"}
        </AngleIndicator>
      </PointerOne>
      <PointerTwo angle={pointerTwoAngle}>
        <AngleIndicator>
          {pointerTwoAngle + 90}
          {"\u00b0"}
        </AngleIndicator>
      </PointerTwo>
      <PointerHolder />
      <RowWrapper className="row">
        {/* {Array.from({ length: 10 }).map((tick, idx) => {
          return <Tick />;
        })} */}
      </RowWrapper>
    </AngleSelectorWrapper>
  );
};

export default AngleSelector;

type PointerProps = {
  angle: number;
};

const AngleSelectorWrapper = styled(ColumnWrapper)`
  position: relative;
  width: 400px;
  height: 180px;
  align-items: center;
  .row {
    position: relative;
    top: 140px;
    width: 250px;
    height: 20px;
    background-color: #474e5f;
    border-radius: 2px;
  }
  .semiCircleOuter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 135px;
    width: 225px;
    border-radius: 150px 150px 0 0;
    border-bottom: 0px;
    background-color: #474e5f;
    z-index: 5;
  }
  .semiCircleInner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 110px;
    width: 200px;
    border-radius: 150px 150px 0 0;
    background-color: ${(props) => props.theme.colors.secondaryBlack};
    border-bottom: 0px;
    z-index: 5;
  }
`;

const PointerOne = styled.div<PointerProps>`
  position: absolute;
  left: 49.5%;
  bottom: 37px;
  height: 140px;
  width: 5px;
  background-color: ${(props) => props.theme.colors.highlight1};
  display: flex;
  justify-content: center;
  cursor: grab;
  z-index: 6;
  transform-origin: bottom center;
  transition: all 500ms ease-in-out;
  transform: ${(props) => `rotate(${props.angle}deg)`};
  border-radius: 2px;
`;

const PointerTwo = styled.div<PointerProps>`
  position: absolute;
  left: 49.5%;
  bottom: 37px;
  height: 140px;
  width: 5px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.highlight1};
  cursor: grab;
  z-index: 6;
  transform-origin: bottom center;
  transition: all 500ms ease-in-out;
  transform: ${(props) => `rotate(${props.angle}deg)`};
  border-radius: 2px;
`;

const AngleIndicator = styled.p`
  position: absolute;
  top: -25px;
  color: ${(props) => props.theme.colors.primaryWhite};
`;

const PointerHolder = styled.div`
  position: absolute;
  left: 50%;
  bottom: 27px;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 15px;
  background-color: ${(props) => props.theme.colors.highlight1};
  z-index: 7;
  border-radius: 25px 25px 0px 0px;
`;
