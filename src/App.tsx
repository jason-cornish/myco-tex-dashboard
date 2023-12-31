import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Display from "./components/display/search";
import { getProfile } from "./data/profiles";
import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./components/display/home/home";
import { getAscents } from "./data/ascents";
import { AscentsType } from "./types/ascents-type";
import SteamerPage from "./components/display/home/steamer/steamer-page";
import MixerPage from "./components/display/home/mixer/mixer-page";
import LabPage from "./components/display/home/lab/lab-page";
import IncubatorPage from "./components/display/home/incubator/incubator-page";
import SignUpPage from "./components/display/sign-up-page/sign-up-page";
import LoginPage from "./components/display/login-page/login-page";

const theme = {
  colors: {
    primaryWhite: "#ccd0d9",
    secondaryWhite: "#a3a6ad",
    primaryBlack: "#252932",
    secondaryBlack: "#1d2027",
    darkestBlack: "#0e0e0f",
    highlight1: "#00c07d",
    lightHighlight1: "#eafff7",
    grey: "#a0a7b8",
    greyDarker: "#808593",
    // highlight1: "#0d9263",
    // highlight1: "#00d68b",
    highlight2: "#303134",
    highlight3: "#2e323e",
    highlight4: "#363c49",
    hightlight5: "#5a6479",
    borderColor: "#919191",
  },
  fonts: {
    header: "Roboto",
    body: "Archivo",
  },
  other: {
    borderRadius: "7px",
    boxShadow:
      "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)",
  },
};

export const DataContext = createContext<any>({} as any);

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("home");
  const [userProfile, setUserProfile] = useState<{ [key: string]: any }>([]);
  const [loading, setLoading] = useState(true);
  const [showGreyLayer, setShowGreyLayer] = useState(false);
  const [ascents, setAscents] = useState<AscentsType[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const userProfile = await getProfile();
      setUserProfile(userProfile);
    };
    fetchData();
    setLoading(false);
  }, [setUserProfile, setLoading]);

  return (
    <Router>
      <DataContext.Provider
        value={{
          searchQuery,
          setSearchQuery,
          userProfile,
          setUserProfile,
          loading,
          showGreyLayer,
          setShowGreyLayer,
          theme,
          ascents,
          setAscents,
        }}
      >
        <ThemeProvider theme={theme}>
          <GreyLayerWrapper>
            <div className={showGreyLayer ? "visible" : "invisible"} />
          </GreyLayerWrapper>
          <NavBar />
          <ApplicationWrapper>
            <Sidebar
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<Navigate to="/home/mixer" />}></Route>
                <Route
                  path="/home"
                  element={<Navigate to="/home/mixer" />}
                ></Route>
                <Route path="sign-up" element={<SignUpPage />}></Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="home" element={<Home />}>
                  <Route path="steamer" element={<SteamerPage />}></Route>
                  <Route path="mixer" element={<MixerPage />}></Route>
                  <Route path="lab" element={<LabPage />}></Route>
                  <Route path="incubation" element={<IncubatorPage />}></Route>
                </Route>
              </Routes>
            </ContentWrapper>
          </ApplicationWrapper>
        </ThemeProvider>
      </DataContext.Provider>
    </Router>
  );
};

export default App;

const ApplicationWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBlack};
  display: flex;
  height: fill-available;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: fill-available;
  max-height: 100%;
  overflow-y: auto;
  /* background-color: ${(props) => props.theme.colors.primaryBlack}; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 70px;
  @media only screen and (max-width: 850px) {
  }
`;

const GreyLayerWrapper = styled.div`
  .visible {
    display: flex;
    position: absolute;
    z-index: 3;
    background-color: #1a1f2a;
    opacity: 50%;
    width: 100%;
    height: 100%;
    margin: 0px;
    animation: opacify 300ms ease-in 0ms forwards;
    @keyframes opacify {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 50%;
      }
    }
  }
  .invisible {
    display: none;
    opacity: 0;
  }
`;
