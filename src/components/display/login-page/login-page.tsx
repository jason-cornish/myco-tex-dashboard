import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../../reusable/styled-components";
import { Icon } from "@blueprintjs/core";
import Button from "../../../reusable/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../../../App";
import { useNavigate } from "react-router";
import { sendLoginRequest } from "./send-login-request";

export type FormStateType = {
  // companyName : {
  //   value : string;
  //   hasError : boolean;
  //   errorMessage : "string"
  // },
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, APIURL } = useContext(DataContext);
  const [formState, setFormState] = useState<FormStateType>({
    // companyName: {
    //   value: "",
    //   hasError: true,
    //   errorMessage: "Maximum company name length is 30 characters",
    // },
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
    const emailErrorState = inputHasError("email");
    if (
      emailErrorState.hasError &&
      formState.password.value !== "" &&
      !stateCopy.email.hasError
    ) {
      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;
      setFormState(stateCopy);
    } else if (formState.email.hasError && !emailErrorState.hasError) {
      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
    }
    const passwordErrorState = inputHasError("password");
    if (formState.password.hasError && !passwordErrorState.hasError) {
      stateCopy.password.errorMessage = passwordErrorState.errorMessage;
      stateCopy.password.hasError = passwordErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;
    }
  }, [formState, inputHasError]);

  const handleSubmit = async () => {
    console.log("testing");
    const emailErrorState = inputHasError("email");
    const passwordErrorState = inputHasError("password");
    const stateCopy = { ...formState };

    if (passwordErrorState.hasError || emailErrorState.hasError) {
      stateCopy.password.errorMessage = passwordErrorState.errorMessage;
      stateCopy.password.hasError = passwordErrorState.hasError;
      stateCopy.password.renderValidityIcon = true;

      stateCopy.email.errorMessage = emailErrorState.errorMessage;
      stateCopy.email.hasError = emailErrorState.hasError;
      stateCopy.email.renderValidityIcon = true;

      setFormState(stateCopy);
      return;
    }
    const res: any = await sendLoginRequest(formState, APIURL);
    if (res.status !== 200) {
      if (res.status === 400) {
        const formStateCopy = { ...formState };
        formStateCopy.email.hasError = true;
        formStateCopy.password.hasError = true;
        formStateCopy.email.renderValidityIcon = true;
        formStateCopy.password.renderValidityIcon = true;
        formStateCopy.password.errorMessage = "Invalid email or password";
        setFormState(formStateCopy);
      }
      return;
    }

    setUserProfile({
      email: formState.email.value,
      name: "Fallen Oak Mycology",
      userID: res.user_id,
      authToken: res.token,
    });
    localStorage.setItem("authToken", res.token);
    localStorage.setItem("email", formState.email.value);
    localStorage.setItem("name", "Fallen Oak Mycology");
    localStorage.setItem("userID", res.user_id);
    // setUserProfile({ email: formState.email, name: "Fallen Oak Mycology" });
    navigate("/home");
  };

  const handleClickDemo = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserProfile({ email: "demo@demo.com", name: "Demo User" });
    navigate("/home");
  };

  return (
    <LoginPageBackground>
      {/* <LogoWrapper>
        <h1>Myco-Tex Farm Analytics</h1>
      </LogoWrapper> */}
      <FormWrapper>
        <h1>Login</h1>
        <form>
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
            text="Login"
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
    </LoginPageBackground>
  );
};

type PropsType = {
  icon: any;
};

export default LoginPage;

const LoginPageBackground = styled(ColumnWrapper)`
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
  position: relative;
  box-sizing: border-box;
  top: 50%;
  transform: translateY(-50%);
  width: 350px;
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
