import React from "react";
import styled from "styled-components";
import Button from "./button";
import { ColumnWrapper, RowWrapper } from "./styled-components";
type PropsType = {
  displayModal: any;
  setDisplayModal: any;
  setShowGreyLayer: any;
  selectedAscents: any;
  setSelectedAscents: any;
  deleteAscents: any;
};

const DeleteModal = (props: PropsType) => {
  const {
    displayModal,
    setDisplayModal,
    setShowGreyLayer,
    selectedAscents,
    setSelectedAscents,
    deleteAscents,
  } = props;

  return (
    <DisplayWrapper>
      <ModalWrapper
        className={displayModal.deleteModal ? "visible" : "invisible"}
      >
        <ContentWrapper>
          <h1>Delete ascents?</h1>
          <p>
            This will remove <b>{selectedAscents.length}</b> ascents from your
            ascent history.
          </p>
          <RowWrapper className="row">
            <Button
              text="Confirm"
              icon=""
              onClick={() => {
                deleteAscents();
                setSelectedAscents([]);
                setDisplayModal({ ...displayModal, deleteModal: false });
                setShowGreyLayer(false);
              }}
              type="fancy"
            />
            <Button
              text="Cancel"
              icon=""
              onClick={() => {
                setDisplayModal({ ...displayModal, deleteModal: false });
                setShowGreyLayer(false);
              }}
              type="regular"
            />
          </RowWrapper>
        </ContentWrapper>
      </ModalWrapper>
    </DisplayWrapper>
  );
};

export default DeleteModal;

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
  background-color: ${(props) => props.theme.colors.highlight2};
  border-radius: ${(props) => props.theme.other.borderRadius};
  z-index: 2;
  width: 400px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const ContentWrapper = styled(ColumnWrapper)`
  padding: 50px;
  row-gap: 15px;
  h1 {
    font-size: 24px;
    color: ${(props) => props.theme.colors.primaryWhite};
    font-weight: 700;
  }
  p {
    font-size: 20px;
    color: ${(props) => props.theme.colors.primaryWhite};
  }
  div {
    column-gap: 10px;
  }
  .row {
    column-gap: 20px;
    margin-top: 10px;
  }
`;
