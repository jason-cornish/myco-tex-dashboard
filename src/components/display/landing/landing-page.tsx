import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../../reusable/styled-components";
import Button from "../../../reusable/button";
import { useNavigate } from "react-router";
import { DataContext } from "../../../App";
import { useContext } from "react";
import LandingImage from "../../../assets/landingimage.png";

const LandingPage = () => {
  const { setUserProfile } = useContext(DataContext);
  const navigate = useNavigate();

  const handleClickDemo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserProfile({ email: "demo@demo.com", name: "Demo User" });
    navigate("/home");
  };
  return (
    <LandingPageWrapper>
      <LeftColumnWrapper>
        <h1>Complete control over your mycelium growth conditions</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          repellat beatae unde temporibus, aliquam dolor ratione eveniet a
          quidem soluta minima quas odio repudiandae corporis repellendus. Saepe
          dolor fugit ullam. Provident repellat beatae unde temporibus, aliquam
          dolor ratione eveniet a quidem soluta minima quas odio repudiandae
          corporis repellendus. Saepe dolor fugit ullam.
        </p>

        <ButtonsWrapper>
          <ButtonWrapper>
            <Button
              type="fancy"
              text="Try demo"
              onClick={handleClickDemo}
              icon={false}
              color=""
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              type="regular"
              text="Sign up"
              onClick={() => navigate("/sign-up")}
              icon={false}
              color=""
            />
          </ButtonWrapper>
        </ButtonsWrapper>
      </LeftColumnWrapper>
      <RightColumnWrapper>
        <Snapshot src={LandingImage} />
      </RightColumnWrapper>
    </LandingPageWrapper>
  );
};

export default LandingPage;

const LandingPageWrapper = styled(RowWrapper)`
  position: fixed;
  height: fill-available;
  width: 100vw;
  z-index: 2;
  padding: 24vh 25px 25px 25px;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.secondaryBlack};
  top: 0px;
  left: 0px;
  color: ${(props) => props.theme.colors.primaryWhite};
  column-gap: 20px;
  @media screen and (max-width: 1000px) {
    padding-top: 100px;
    align-items: center;
    overflow-y: auto;
  }
`;

const LeftColumnWrapper = styled(ColumnWrapper)`
  padding-top: 50px;
  width: 55%;
  max-width: 800px;
  row-gap: 20px;
  h1 {
    font-size: 45px;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
  p {
    font-size: 16px;
    color: ${(props) => props.theme.colors.primaryWhite};
    line-height: 28px;
  }
  @media screen and (max-width: 1000px) {
    overflow-y: visible;
    position: relative;
    padding-top: 0px;
    width: 95%;
  }
`;

const RightColumnWrapper = styled(ColumnWrapper)`
  position: relative;
  width: 35%;
  overflow-x: visible;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Snapshot = styled.img`
  height: 500px;
  width: 650px;
  border-radius: ${(props) => props.theme.other.borderRadius};
`;

const ButtonsWrapper = styled(RowWrapper)`
  column-gap: 10px;
`;

const ButtonWrapper = styled.div`
  width: 140px;
  height: 50px;
`;
