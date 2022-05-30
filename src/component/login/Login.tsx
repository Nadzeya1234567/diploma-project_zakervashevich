import React, { useState } from "react";
import FormValuesType from "../../types/FormValuesType";
import useTranslate from "../hooks/useTranslate";
import Button from "../ui/button/Button";
import FormCard from "../ui/formCard/FormCard";
import FormTextField from "../ui/formTextField/FormTextField";

const Login: React.FC = () => {
  const [values, setValues] = useState<FormValuesType>({});
  const { translate } = useTranslate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="center_content">
      <FormCard header="Login">
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

        <Button onClick={handleSubmit}>{translate("login.submit")}</Button>
      </FormCard>
    </div>
  );
};

export default Login;
