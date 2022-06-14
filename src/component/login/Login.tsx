import React, { useEffect, useState } from "react";
import FormValuesType from "../../types/FormValuesType";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useSelector";
import useTranslate from "../hooks/useTranslate";
import Button from "../ui/button/Button";
import FormCard from "../ui/formCard/FormCard";
import FormTextField from "../ui/formTextField/FormTextField";
import { getEmailError, getPasswordError } from "../../helpers/validation";

import "./Login.scss";

const Login: React.FC = () => {
  const [values, _setValues] = useState<FormValuesType>({});
  const [validationError, setValidationError] = useState("");
  const { translate } = useTranslate();
  const { createTokens, setAuthError } = useActions();
  const loading = useSelector((state) => state.auth.loading);
  const email = useSelector((state) => state.auth.email);
  const logged = useSelector((state) => state.auth.logged);
  const password = useSelector((state) => state.auth.password);
  const serverError = useSelector((state) => state.auth.error);
  const error: string = validationError || (serverError ? "No active account found with the given credentials" : "");

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const validationError = getEmailError(values.email) || getPasswordError(values.password);
    if (validationError) {
      setValidationError(validationError);
    } else {
      createTokens(values);
    }
  };

  useEffect(() => {
    if (email === "book@mail.ru" && password === "1234567") {
      localStorage.setItem("logged", logged.toString());
    } else {
      return;
    }
  });

  const setValues = (callback: (prevValue: FormValuesType) => FormValuesType) => {
    _setValues(callback);
    setValidationError("");
    setAuthError(false);
  };

  return (
    <div className="center_content">
      <FormCard header="Login" loading={loading}>
        <div className="login-input">
          <FormTextField
            autofocus
            label={translate("login.email")}
            type="email"
            name="email"
            values={values}
            setValues={setValues}
          />

          <FormTextField
            label={translate("login.password")}
            type="password"
            name="password"
            values={values}
            setValues={setValues}
          />
        </div>

        {error && <div className="form-error">{error}</div>}
        <div className="login-button">
          <Button onClick={handleSubmit}>{translate("login.submit")}</Button>
        </div>
      </FormCard>
    </div>
  );
};

export default Login;
