import React from "react";
import TextField from "../textField/TextField";
import FormValuesType from "../../../types/FormValuesType";

type PropsType = {
  autofocus?: boolean;
  label: string;
  type?: string;
  name: string;
  values: FormValuesType;
  setValues: (callback: (prevValue: FormValuesType) => FormValuesType) => void;
};

const FormTextField: React.FC<PropsType> = ({ name, values, setValues, ...props }) => {
  const setValue = (value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return <TextField {...props} value={values[name]} setValue={setValue} />;
};

export default FormTextField;
