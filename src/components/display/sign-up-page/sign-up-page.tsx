import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../../reusable/styled-components";
import { Icon } from "@blueprintjs/core";
import Button from "../../../reusable/button";
import { useCallback, useEffect, useState, useContext } from "react";
import { DataContext } from "../../../App";
import { useNavigate } from "react-router-dom";

type FormStateType = {
  companyName: {
    value: string;
    hasError: boolean;
    renderValidityIcon: boolean;
    errorMessage: string;
  };
  email: {
    value: string;
    hasError: boolean;
    renderValidityIcon: boolean;
    errorMessage: string;
  };
  password: {
    value: string;
    hasError: boolean;
    renderValidityIcon: boolean;
    errorMessage: string;
  };
};

const SignUpPage = () => {
  const { userProfile, setUserProfile } = useContext(DataContext);

  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormStateType>({
    companyName: {
      value: "",
      hasError: false,
      renderValidityIcon: false,
      errorMessage: "",
    },
    email: {
      value: "",
      hasError: false,
      renderValidityIcon: false,
      errorMessage: "",
    },
    password: {
      value: "",
      hasError: false,
      renderValidityIcon: false,
      errorMessage: "",
    },
  });

  const updateFormState = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputKey: keyof FormStateType
  ) => {
    console.log(formState);
    const stateCopy = { ...formState };
    stateCopy[inputKey].value = e.target.value;
    setFormState(stateCopy);
  };

  const inputHasError = useCallback(
    (input: keyof FormStateType) => {
      const returnObject = {
        hasError: false,
        errorMessage: "",
      };

      const inputValue = formState[input].value;

      switch (input) {
        case "companyName":
          if (inputValue.length === 0) {
            returnObject.hasError = true;
            returnObject.errorMessage = "Please enter a company name";
            break;
          } else if (inputValue.length > 30) {
            returnObject.hasError = true;
            returnObject.errorMessage =
              "Maximum password length is 30 characters";
            break;
          }
          returnObject.hasError = false;
          returnObject.errorMessage = "";
          break;
        case "email":
          let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (inputValue.length === 0) {
            returnObject.hasError = true;
            returnObject.errorMessage = "Please enter an email address";
            break;
          } else if (inputValue.length > 30) {
            returnObject.hasError = true;
            returnObject.errorMessage = "Maximum email length is 30 characters";
            break;
          } else if (!inputValue.match(regex)) {
            returnObject.hasError = true;
            returnObject.errorMessage = "Please enter a valid email address";
            break;
          }
          returnObject.hasError = false;
          returnObject.errorMessage = "";
          break;
        case "password":
          if (inputValue.length === 0) {
            returnObject.hasError = true;
            returnObject.errorMessage = "Please enter a password";
            break;
          } else if (inputValue.length > 10) {
            returnObject.hasError = true;
            returnObject.errorMessage =
              "Maximum password length is 10 characters";
            break;
          }
          returnObject.hasError = false;
          returnObject.errorMessage = "";
          break;
        default:
          returnObject.hasError = false;
          returnObject.errorMessage = "";
          break;
      }
      return returnObject;
    },
    [formState]
  );

  useEffect(() => {
    const stateCopy = { ...formState };

    const companyNameErrorState = inputHasError("companyName");

    if (
      companyNameErrorState.hasError &&
      (formState.email.value !== "" || formState.password.value !== "")
    ) {
      stateCopy.companyName.errorMessage = companyNameErrorState.errorMessage;
      stateCopy.companyName.hasError = companyNameErrorState.hasError;
      stateCopy.companyName.renderValidityIcon = true;
      setFormState(stateCopy);
    } else if (
      formState.companyName.hasError &&
      !companyNameErrorState.hasError
    ) {
      stateCopy.companyName.errorMessage = companyNameErrorState.errorMessage;
      stateCopy.companyName.hasError = companyNameErrorState.hasError;
      setFormState(stateCopy);
    }

    const emailErrorState = inputHasError("email");

    if (emailErrorState.hasError && formState.password.value !== "") {
      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;
      setFormState(stateCopy);
    } else if (formState.email.hasError && !emailErrorState.hasError) {
      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
      setFormState(stateCopy);
    }

    const passwordErrorState = inputHasError("password");
    if (formState.password.hasError && !passwordErrorState.hasError) {
      stateCopy.password.errorMessage = passwordErrorState.errorMessage;
      stateCopy.password.hasError = passwordErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;
      setFormState(stateCopy);
    }
  }, [formState, inputHasError]);

  const handleSubmit = async () => {
    const companyNameErrorState = inputHasError("companyName");
    const emailErrorState = inputHasError("email");
    const passwordErrorState = inputHasError("password");
    const stateCopy = { ...formState };

    if (
      passwordErrorState.hasError ||
      emailErrorState.hasError ||
      companyNameErrorState.hasError
    ) {
      stateCopy.companyName.errorMessage = companyNameErrorState.errorMessage;
      stateCopy.companyName.hasError = companyNameErrorState.hasError;
      stateCopy.companyName.renderValidityIcon = true;

      stateCopy.password.errorMessage = passwordErrorState.errorMessage;
      stateCopy.password.hasError = passwordErrorState.hasError;
      stateCopy.password.renderValidityIcon = true;

      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;

      setFormState(stateCopy);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/login");
  };

  const handleClickDemo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserProfile({ email: "demo@demo.com", name: "Demo User" });
    navigate("/home");
  };

  return (
    <SignUpPageBackground>
      {/* <LogoWrapper>
        <h1>Myco-Tex Farm Analytics</h1>
      </LogoWrapper> */}
      <FormWrapper>
        <h1>Sign up</h1>
        <form>
          <InputWrapper icon={<Icon icon="briefcase" />}>
            <label>Company Name</label>
            <input
              required={true}
              type="text"
              value={formState.companyName.value}
              className={formState.companyName.hasError ? "error" : "valid"}
              onChange={(e) => {
                updateFormState(e, "companyName");
              }}
            ></input>
            {formState.companyName.hasError ? (
              <ErrorMessage>{formState.companyName.errorMessage}</ErrorMessage>
            ) : (
              <div className="emptyDiv" />
            )}
            <LeftIcon>
              <Icon icon="briefcase" size={20} />
            </LeftIcon>
            {formState.companyName.renderValidityIcon ? (
              <RightIcon>
                {formState.companyName.hasError ? (
                  <Icon icon="error" className="error" size={18} />
                ) : (
                  <Icon icon="tick" className="valid" size={18} />
                )}
              </RightIcon>
            ) : (
              <div />
            )}
          </InputWrapper>
          <InputWrapper icon={<Icon icon="envelope" />}>
            <label>Email</label>
            <input
              required={true}
              type="email"
              value={formState.email.value}
              className={formState.email.hasError ? "error" : "valid"}
              onChange={(e) => {
                updateFormState(e, "email");
              }}
            ></input>
            {formState.email.hasError ? (
              <ErrorMessage>{formState.email.errorMessage}</ErrorMessage>
            ) : (
              <div className="emptyDiv" />
            )}
            <LeftIcon>
              <Icon icon="envelope" size={22} />
            </LeftIcon>
            {formState.email.renderValidityIcon ? (
              <RightIcon>
                {formState.email.hasError ? (
                  <Icon icon="error" className="error" size={18} />
                ) : (
                  <Icon icon="tick" className="valid" size={18} />
                )}
              </RightIcon>
            ) : (
              <div />
            )}
          </InputWrapper>

          <InputWrapper icon={<Icon icon="envelope" />}>
            <label>Password</label>
            <input
              type="password"
              value={formState.password.value}
              className={formState.password.hasError ? "error" : "valid"}
              onChange={(e) => {
                updateFormState(e, "password");
              }}
            ></input>
            {formState.password.hasError ? (
              <ErrorMessage>{formState.password.errorMessage}</ErrorMessage>
            ) : (
              <div className="emptyDiv" />
            )}
            <LeftIcon>
              <Icon icon="key" size={22} />
            </LeftIcon>
            {formState.password.renderValidityIcon ? (
              <RightIcon>
                {formState.password.hasError ? (
                  <Icon icon="error" className="error" size={18} />
                ) : (
                  <Icon icon="tick" className="valid" size={18} />
                )}
              </RightIcon>
            ) : (
              <div />
            )}
          </InputWrapper>
        </form>
        {/* <p>
          Want to demo the application? <span>Login as demo user</span>
        </p> */}
        <ButtonsWrapper>
          <Button
            type="fancy"
            text="Sign Up"
            icon={<div />}
            color={false}
            onClick={handleSubmit}
          />

          <OrWrapper>
            <Line />
            <p>or</p>
            <Line />
          </OrWrapper>
          <Button
            type="fancy"
            text="Demo Session"
            icon={<div />}
            color={"#00a3c0"}
            onClick={handleClickDemo}
          />
        </ButtonsWrapper>
      </FormWrapper>
    </SignUpPageBackground>
  );
};

type PropsType = {
  icon: any;
};

export default SignUpPage;

const SignUpPageBackground = styled(ColumnWrapper)`
  position: fixed;
  height: fill-available;
  width: 100vw;
  z-index: 2;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBlack};
  top: 0px;
  left: 0px;
  color: ${(props) => props.theme.colors.primaryWhite};
  row-gap: 20px;
`;

const FormWrapper = styled(ColumnWrapper)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
  min-width: 350px;
  background-color: ${(props) => props.theme.colors.primaryBlack};
  border-radius: ${(props) => props.theme.other.borderRadius};
  padding: 25px;
  box-shadow: ${(props) => props.theme.other.boxShadow};
  row-gap: 20px;
  h1 {
    font-size: 28px;
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    margin-bottom: 20px;
  }
  p {
    color: ${(props) => props.theme.colors.grey};
    span {
      color: ${(props) => props.theme.colors.primaryWhite};
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const InputWrapper = styled(ColumnWrapper)<PropsType>`
  position: relative;
  row-gap: 5px;
  font-family: Roboto;
  label {
    font-size: 18px;
    color: ${(props) => props.theme.colors.grey};
  }
  .error {
    outline: 1px solid #e50000;
    box-shadow: 0 0 5px #e50000;
    :focus {
      background-color: ${(props) => props.theme.colors.highlight4};
    }
  }
  .valid {
    /* outline : 1px solid #5cb85c;
    box-shadow: 0 0 5px  */
    :focus {
      outline: none;
      background-color: ${(props) => props.theme.colors.highlight4};
      box-shadow: 0 0 3px ${(props) => props.theme.colors.primaryWhite};
    }
  }
  input {
    height: 40px;
    border-radius: ${(props) => props.theme.other.borderRadius};
    background-color: ${(props) => props.theme.colors.highlight3};
    box-shadow: ${(props) => props.theme.other.boxShadow};
    border: 0px;
    color: ${(props) => props.theme.colors.primaryWhite};
    padding-left: 45px;
    font-size: 16px;
  }
  .emptyDiv {
    margin-top: -5px;
  }
`;

const ButtonsWrapper = styled(ColumnWrapper)`
  row-gap: 15px;
`;

const OrWrapper = styled(RowWrapper)`
  width: 100%;
  align-items: center;
  column-gap: 10px;
  p {
    margin: 0px;
    color: ${(props) => props.theme.colors.grey};
    font-size: 16px;
  }
`;

const Line = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey};
  width: 48%;
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 13px;
  top: 38px;
  height: 20px;
  width: 20px;
  svg {
    fill: ${(props) => props.theme.colors.primaryWhite};
  }
`;

const RightIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 38px;
  height: 20px;
  width: 20px;
  .error {
    fill: #e50000;
    outline: none;
    box-shadow: none;
  }
  .valid {
    fill: #5cb85c;
    outline: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -21px;
  left: 2px;
  font-size: 14px;
  font-weight: 400 !important;
  color: #e50000 !important;
`;
