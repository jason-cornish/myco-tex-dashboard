import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../../reusable/styled-components";
import JasonCompressed from "../../../assets/JasonCompressed.jpg";

import SpiderChart from "./spider-chart/spider-chart";
import SpiderChartContainer from "./spider-chart/chart-wrapper";
import AscentsChartContainer from "./ascents-grades-chart/chart-wrapper";
import ScatterChartContainer from "./scatter-plot/chart-wrapper";
import { DataContext } from "../../../App";
import LiveConection from "./live-connection";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useFetch } from "../../../hooks/useFetch";
import NoDataComponent from "../../../reusable/no-data-component";

export const HomeContext = createContext<any>({} as any);

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, APIURL, invalidateSession } = useContext(DataContext);
  const [selectedTab, setSelectedTab] = useState("Mixer");
  const [reportDataAvailable, setReportDataAvailable] = useState(false);
  const [availableTabs, setAvailableTabs] = useState({});

  const location = useLocation();

  useEffect(() => {
    const tabNameFromPath = location.pathname.split("/")[2];
    const uppercaseTabNameFromPath =
      tabNameFromPath.charAt(0).toUpperCase() + tabNameFromPath.slice(1);
    setSelectedTab(uppercaseTabNameFromPath);
  }, [location]);

  useEffect(() => {
    if (!userProfile.hasOwnProperty("email") || !userProfile.email) {
      console.log(userProfile);
      navigate("/landing");
    }
  }, [navigate, userProfile]);

  const fetchFromAPI = useCallback(
    async (options: any) => {
      if (
        !userProfile.hasOwnProperty("userID") ||
        !userProfile.hasOwnProperty("authToken")
      )
        return false;
      // console.log(options);

      const res = await axios(options)
        .then((res) => {
          // console.log(res);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          if (error.data === "Your auth token is invalid or expired") {
            invalidateSession("all");
          }
          return false;
        });
      return res;
    },
    [userProfile, invalidateSession]
  );

  const generateAvailableRooms = useCallback((userReport: any) => {
    let localAvailableTabs: any = {};
    userReport.data.locations[0].rooms.forEach((room: any) => {
      localAvailableTabs[room.room_title] = room;
    });
    return localAvailableTabs;
  }, []);

  const options = useMemo(() => {
    return {
      url: `${APIURL}/api/report`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userProfile.authToken,
      },
    };
  }, [userProfile, APIURL]);

  const { data: userReport }: any = useFetch(options, false);

  useEffect(() => {
    if (reportDataAvailable) setReportDataAvailable(false);
    (async () => {
      if (userReport) {
        console.log(userReport);
        if (userReport.hasOwnProperty("data")) {
          if (userReport.data.hasOwnProperty("locations")) {
            //.locations[0].rooms.length
            const localAvailableTabs = generateAvailableRooms(userReport);
            setAvailableTabs(localAvailableTabs);
            setReportDataAvailable(true);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userReport,
    fetchFromAPI,
    APIURL,
    userProfile,
    generateAvailableRooms,
    setAvailableTabs,
    setReportDataAvailable,
  ]);

  return (
    <HomeWrapper>
      <CenteredDiv>
        {reportDataAvailable && Object.keys(availableTabs).length ? (
          <NavigationTabs>
            {Object.keys(availableTabs).map((tab) => {
              return (
                <TabText
                  to={`${tab.toLowerCase()}`}
                  className={selectedTab === tab ? "selected" : "unselected"}
                  onClick={() => {
                    setSelectedTab(tab);
                  }}
                >
                  {tab}
                </TabText>
              );
            })}
          </NavigationTabs>
        ) : (
          <NoDataComponent />
        )}

        <HomeContext.Provider
          value={{
            availableTabs,
            fetchFromAPI,
            reportDataAvailable,
          }}
        >
          {reportDataAvailable ? <Outlet /> : <div></div>}
        </HomeContext.Provider>
      </CenteredDiv>
    </HomeWrapper>
  );
};

export default Profile;

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  @media only screen and (max-width: 850px) {
    padding: 20px;
  }
`;

const ChartsRow = styled(RowWrapper)`
  column-gap: 20px;
`;

const TabText = styled(Link)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.primaryWhite};
  text-decoration: none;
  font-family: roboto;
  :hover {
    color: white;
  }
  cursor: pointer;
  transition: color 300ms linear;
`;

const NavigationTabs = styled(RowWrapper)`
  font-size: 16px;
  column-gap: 20px;
  align-items: center;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyDarker};
  .selected {
    position: relative;
    color: ${(props) => props.theme.colors.highlight1};
    &:after {
      content: "";
      position: absolute;
      display: block;
      bottom: -13px;
      width: calc(100% + 10px);
      height: 5px;
      left: -4px;
      border-radius: ${(props) => props.theme.other.borderRadius};
      background-color: ${(props) => props.theme.colors.highlight1};
    }
  }
`;

const CenteredDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  width: 100%;
  row-gap: 20px;
  column-gap: 15px;
  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
  h1 {
    color: ${(props) => props.theme.colors.primaryWhite};
    font-size: 26px;
  }
`;
