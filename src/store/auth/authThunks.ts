import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Storage from "../../helpers/Storage";
import FormValuesType from "../../types/FormValuesType";
import ProfileType from "../../types/ProfileType";

const URL = "https://studapi.teachmeskills.by/auth/jwt/create/";

type TokensType = {
  access: string;
  refresh: string;
};

export const createTokens = createAsyncThunk<TokensType, FormValuesType>("auth/createTokens", async (data) => {
  const URL = "https://studapi.teachmeskills.by/auth/jwt/create/";
  const response = await axios.post(URL, data);
  return response.data as TokensType;
});

export const fetchProfile = createAsyncThunk<ProfileType>("auth/fetchProfile", async () => {
  const URL = "https://studapi.teachmeskills.by/auth/users/me/";
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${Storage.get("access", "")}`,
    },
  });
  return response.data as ProfileType;
});
