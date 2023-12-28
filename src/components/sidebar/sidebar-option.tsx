import { Link } from "react-router-dom";
import styled from "styled-components";

type PropsTypes = {
  isCollapsed: boolean;
  content: {
    icon: any;
    label: any;
    id: string;
    onClick: any;
    selected: string;
    link?: string;
  };
};

const SidebarOption = (props: PropsTypes) => {
  const { isCollapsed, content } = props;

  const renderSwitch = (component: any) => {
    return isCollapsed ? <div /> : component;
  };

  const classNameSwitch = () => {
    return isCollapsed
      ? `collapsed ${content.selected}`
      : `expanded ${content.selected}`;
  };

  return (
    <Link to={`${content.link}`} style={{ textDecoration: "none" }}>
      <SidebarOptionWrapper
        className={classNameSwitch()}
        id={content.id}
        onClick={content.onClick}
      >
        {content.icon}
        {content.label}
      </SidebarOptionWrapper>
    </Link>
  );
};

export default SidebarOption;

const SidebarOptionWrapper = styled.div`
  display: grid;
  box-sizing: border-box;

  cursor: pointer;
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 10px 15px;
  box-sizing: border-box;
  align-items: center;
  column-gap: 15px;
  grid-template-columns: 22px 100%;
  transition: background-color 300ms linear;
  @media only screen and (max-width: 850px) {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
  }
  span {
    transition: fill 300ms linear;
    height: 22px;
    width: 22px;
    fill: ${(props) => props.theme.colors.primaryWhite};
  }
  h1 {
    font-family: ${(props) => props.theme.fonts.body};
    color: ${(props) => props.theme.colors.primaryWhite};
    margin: 0px;
    font-weight: 600;
    font-size: 26px;
    white-space: nowrap;
  }
  p {
    font-family: ${(props) => props.theme.fonts.header};
    color: ${(props) => props.theme.colors.primaryWhite};
    font-weight: 500;
    font-size: 18px;
    white-space: nowrap;
    margin: 0px;
    transition: color 300ms linear;
  }
`;
