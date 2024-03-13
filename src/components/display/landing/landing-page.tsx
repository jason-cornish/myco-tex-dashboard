import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../../reusable/styled-components";
import Button from "../../../reusable/button";
import { useNavigate } from "react-router";
import { DataContext } from "../../../App";
import { useContext } from "react";
import LandingImage from "../../../assets/landingimage.png";
import KeyFeaturesSection from "./key-features";
import useDemoSession from "../../../hooks/useDemoSession";

const LandingPage = () => {
  const { setUserProfile, demoUserCredentials } = useContext(DataContext);
  const navigate = useNavigate();

  const { sendLoginRequest } = useDemoSession();

  return (
    <LandingPageWrapper>
      <CenteredDiv>
        <SectionOne>
          <LeftColumnWrapper>
            <h1>Complete control over your mycelium growth conditions</h1>
            <p>
              MycoTex Monitoring Solutions is an advanced, comprehensive
              monitoring system designed specifically for mushroom cultivation
              facilities. This state-of-the-art system integrates a wide array
              of sensors to continuously monitor and record crucial
              environmental conditions, ensuring optimal growth conditions and
              high yields.
            </p>
            <p>
              Overall, MycoTex Monitoring Solutions offers a comprehensive,
              customizable, and user-friendly system for mushroom cultivation
              facilities, aiming to enhance productivity and ensure the highest
              quality of mushroom production through meticulous environmental
              monitoring and control.
            </p>

            <ButtonsWrapper>
              <ButtonWrapper>
                <Button
                  type="fancy"
                  text="Try demo"
                  onClick={() => sendLoginRequest(setUserProfile)}
                  icon={false}
                  color=""
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  type="regular"
                  text="Login"
                  onClick={() => navigate("/login")}
                  icon={false}
                  color=""
                />
              </ButtonWrapper>
            </ButtonsWrapper>
          </LeftColumnWrapper>
          <RightColumnWrapper>
            <Snapshot src={LandingImage} />
          </RightColumnWrapper>
        </SectionOne>
        <KeyFeaturesSection />
      </CenteredDiv>
    </LandingPageWrapper>
  );
};

export default LandingPage;

const LandingPageWrapper = styled(ColumnWrapper)`
  align-items: center;
  left: 0px;
  position: fixed;
  width: 100%;
  overflow-x: hidden;
  max-width: 100%;
  height: 100%;
  z-index: 2;
  overflow-y: auto;
  padding: 100px 50px 25px 50px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.secondaryBlack};
  top: 0px;
  left: 0px;
  color: ${(props) => props.theme.colors.primaryWhite};

  @media screen and (max-width: 1000px) {
    padding-top: 100px;
    align-items: center;
    overflow-y: auto;
  }
  @media screen and (max-width: 700px) {
    padding: 100px 25px 25px 25px;
    align-items: center;
    overflow-y: auto;
  }
`;

const CenteredDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  width: 100%;
  row-gap: 75px;
  column-gap: 15px;
  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`;

const SectionOne = styled(RowWrapper)`
  column-gap: 20px;
  max-width: 1000px;
`;

const LeftColumnWrapper = styled(ColumnWrapper)`
  padding-top: 50px;
  width: 70%;
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
    width: 100%;
  }
`;

const RightColumnWrapper = styled(ColumnWrapper)`
  padding-top: 55px;
  position: relative;
  width: 35%;
  overflow-x: visible;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Snapshot = styled.img`
  width: 600px;
  height: 470px;
  border-radius: ${(props) => props.theme.other.borderRadius};
`;

const ButtonsWrapper = styled(RowWrapper)`
  column-gap: 10px;
`;

const ButtonWrapper = styled.div`
  width: 140px;
  height: 50px;
`;
