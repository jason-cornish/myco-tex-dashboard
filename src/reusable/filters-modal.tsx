import React, { useState } from "react";
import styled from "styled-components";
import Button from "./button";
import { ColumnWrapper, RowWrapper } from "./styled-components";
import Toggle from "./toggle-button";
import { Icon } from "@blueprintjs/core";
import RangeInput from "./max-attempts";
import AngleSelector from "./angle-selector";
type PropsType = {
  displayModal: any;
  setDisplayModal: any;
  setShowGreyLayer: any;
  state: any;
  confirmChanges: any;
};

const FiltersModal = (props: PropsType) => {
  const {
    displayModal,
    setDisplayModal,
    setShowGreyLayer,
    state,
    confirmChanges,
  } = props;

  const [localSelectedFilters, setLocalSelectedFilters] = useState(state);

  const closeModal = () => {
    setDisplayModal(false);
    setShowGreyLayer(false);
  };

  const updateLocalState = (filterName: string, newValue: any) => {
    setLocalSelectedFilters({
      ...localSelectedFilters,
      [filterName]: newValue,
    });
  };

  return (
    <DisplayWrapper>
      <ModalWrapper
        className={displayModal.filtersModal ? "visible" : "invisible"}
      >
        <ContentWrapper>
          <RowWrapper className="topRow">
            <h1>Filters</h1>
            <Button
              icon={<Icon icon="cross" size={22} />}
              text={false}
              type="regular"
              onClick={closeModal}
            />
          </RowWrapper>
          <FilterWrapper>
            <p>Route Type</p>
            <Toggle
              option1="Boulders"
              option2="Routes"
              state={state.routeType}
              onClick={updateLocalState}
            />
          </FilterWrapper>
          <FilterWrapper>
            <p>Grade Range</p>
            <Toggle
              option1="Boulders"
              option2="Routes"
              state={state.routeType}
              onClick={updateLocalState}
            />
          </FilterWrapper>
          <FilterWrapper>
            <p>Max Attempts</p>
            <RangeInput
              state={localSelectedFilters}
              updateState={updateLocalState}
              filterName="maxAttempts"
            />
          </FilterWrapper>
          <FilterWrapper>
            <p>Wall Angle</p>
            <AngleSelector />
          </FilterWrapper>
        </ContentWrapper>
      </ModalWrapper>
    </DisplayWrapper>
  );
};

export default FiltersModal;

const DisplayWrapper = styled.div`
  .visible {
    display: flex;
  }
  .invisible {
    display: none;
  }
`;

const ModalWrapper = styled(ColumnWrapper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.secondaryBlack};
  border-radius: ${(props) => props.theme.other.borderRadius};
  box-shadow: ${(props) => props.theme.other.boxShadow};
  z-index: 3;
  min-width: 400px;
`;

const FilterWrapper = styled(ColumnWrapper)`
  row-gap: 10px;
`;

const ContentWrapper = styled(ColumnWrapper)`
  padding: 40px;
  row-gap: 20px;
  align-items: flex-start;
  h1 {
    font-size: 22px;
    color: ${(props) => props.theme.colors.primaryWhite};
    font-weight: 600;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
  div {
    column-gap: 10px;
  }
  .row {
    column-gap: 20px;
    margin-top: 10px;
  }
  .topRow {
    justify-content: space-between;
    width: 100%;
  }
`;
