import React, { useContext } from "react";
import { DataContext } from "../../App";
import styled from "styled-components";

const Display = (props: any) => {
  const { profiles, searchQuery, loading } = useContext(DataContext);

  const renderContent = () => {
    console.log(loading, profiles);
    return loading ? (
      <div />
    ) : (
      profiles
        .filter((profile: any) => {
          if (searchQuery === "") {
            return profile;
          } else if (
            profile.pname.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return profile;
          }
        })
        .map((profile: any, index: number) => {
          return (
            <ProfileCard>
              <AcctIcon>
                <h1>{profile.pname.slice(0, 1)}</h1>
              </AcctIcon>
              <ul>
                <li>
                  <h3>
                    {profile.pname}
                    <span>{profile.proNoun}</span>
                  </h3>
                </li>
                <li>
                  <p>
                    {profile.city}, {profile.state}
                  </p>
                </li>
                <li>
                  <p>
                    {profile.maxRouteV}/{profile.maxRouteFont}
                  </p>
                </li>
              </ul>
            </ProfileCard>
          );
        })
    );
  };

  return <DisplayWrapper>{renderContent()}</DisplayWrapper>;
};
export default Display;

const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.primaryBlack};
`;

const ProfileCard = styled.div`
  /* background-color: ${(props) => props.theme.colors.highlight2}; */
  color: ${(props) => props.theme.colors.primaryWhite};
  font-family: ${(props) => props.theme.fonts.body};
  display: flex;
  height: 100px;
  width: 400px;
  border-radius: 5px;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
    list-style: none;
    padding-left: 10px;
  }
  li {
  }
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
  span {
    font-size: 12px;
    margin: 0 10px;
  }
`;

const AcctIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.primaryWhite};
  color: ${(props) => props.theme.colors.primaryBlack};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
