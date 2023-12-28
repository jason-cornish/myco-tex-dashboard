import styled from "styled-components";
import { Icon } from "@blueprintjs/core";
import { ColumnWrapper } from "../../reusable/styled-components";
import { useState } from "react";
import SidebarOption from "./sidebar-option";
import Button from "../../reusable/button";

type PropsType = {
  setSelectedTab: any;
  selectedTab: string;
};

const Sidebar = (props: PropsType) => {
  const { setSelectedTab, selectedTab } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [buttonTimeout, setButtonTimeout] = useState(false);

  const selectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const isTabSelected = (tab: string) => {
    return selectedTab === tab ? "selected" : "unselected";
  };

  const sidebarRows = [
    {
      icon: <StyledIcon icon="home" size={22} />,
      onClick: () => selectTab("home"),
      label: <p>Home</p>,
      id: "home",
      selected: isTabSelected("home"),
      link: "/home",
    },
  ];

  /**Prevents accidental double-clicking of collapse/expand button*/
  const handleCollapseExpand = () => {
    if (buttonTimeout) {
      setTimeout(() => {
        setButtonTimeout(!buttonTimeout);
      }, 500);
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Wrapper>
      <SidebarWrapper className={isCollapsed ? "collapsed" : "expanded"}>
        {sidebarRows.map((row) => {
          return (
            <SidebarOption
              isCollapsed={isCollapsed}
              content={row}
              key={`option-${row}`}
            />
          );
        })}
        {/* <Button
          onClick={handleCollapseExpand}
          text={!isCollapsed ? "Collapse" : ""}
          icon={<Icon icon="horizontal-inbetween" size={22} />}
          type="regular"
        ></Button> */}
      </SidebarWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  border-right: 0px solid ${(props) => props.theme.colors.highlight3};
  border-radius: 5px;
  box-shadow: inset -12px 0px 1px -11px rgba(204, 208, 217, 0.2);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  left: 0;
  top: 70px;
  max-height: calc(100% - 80px);
  padding: 0px 10px;
  box-sizing: border-box;
  .collapsed {
    width: 52px;
  }
  .expanded {
    width: 150px;
  }
  @media only screen and (max-width: 850px) {
    position: fixed;
    width: 100%;
    top: auto;
    bottom: 0;
    z-index: 2;
    background-color: ${(props) => props.theme.colors.highlight3};
    box-shadow: inset 0px 11px 1px -11px rgba(204, 208, 217, 1);
    .collapsed {
      width: 100%;
      flex-direction: row;
    }
    .expanded {
      width: 100%;
      flex-direction: row;
    }
  }
`;

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primaryWhite};
`;

const SidebarWrapper = styled(ColumnWrapper)`
  border: 0px;
  padding: 10px;
  transition: width 300ms ease-in-out;
  position: relative;
  overflow-x: hidden;
  align-items: center;
  row-gap: 10px;
  box-sizing: border-box;
  height: 100%;

  button {
    width: 50px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.primaryWhite};
  }
  .selected {
    background-color: ${(props) => props.theme.colors.highlight1};

    p {
      color: ${(props) => props.theme.colors.secondaryBlack};
    }
    span {
      fill: ${(props) => props.theme.colors.secondaryBlack};
    }
  }
  .unselected {
    :hover {
      background-color: ${(props) => props.theme.colors.highlight4};

      p {
        color: white;
      }
      span {
        fill: white;
      }
    }
  }
  .collapsed {
    column-gap: 0px !important;
    p {
      display: none;
    }
  }
  #logo {
    column-gap: 10px;
    grid-template-columns: 25px 100%;
    span {
      margin-left: -8px;
      margin-top: -5px;
      height: 30px !important;
      width: 25px !important;
    }
  }
  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    .collapseButton {
      display: none;
    }
    .expanded {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
    }
    .collapsed {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      p {
        display: flex;
      }
    }
    #logo {
      display: none;
      position: absolute;
      flex: 0 0 100%;
    }
  }
`;
