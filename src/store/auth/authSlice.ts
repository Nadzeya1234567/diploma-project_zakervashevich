import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Storage from "../../helpers/Storage";
import FormValuesType from "../../types/FormValuesType";

type StoreType = {
  access?: string;
  refresh?: string;
  loading: boolean;
  error: boolean;
  logged: boolean;
  login: string;
  password: string;
};

const initialState: StoreType = {
  logged: !!Storage.get("access", false),
  loading: false,
  error: false,
  access: Storage.get("access", undefined),
  refresh: Storage.get("refresh", undefined),
  login: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createTokens: (state, { payload }: PayloadAction<FormValuesType>) => {},

    setAuthError: (state, { payload }: PayloadAction<boolean>) => {
      state.error = payload;
    },
    setAuthLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setAccess: (state, { payload }: PayloadAction<string>) => {
      state.access = payload;
      state.logged = !!payload;
      Storage.set("access", payload);
    },
    setRefresh: (state, { payload }: PayloadAction<string>) => {
      state.refresh = payload;
      Storage.set("refresh", payload);
    },
    setLogged: (state, { payload }: PayloadAction<string>) => {
      if (state.login === "book@mail.ru" && state.password === "1234567") {
        state.logged = true;
        state.login = payload;
        state.password = payload;
        Storage.set("logged", payload);
      } else {
        state.logged = false;
      }
    },
    logout: (state) => {
      state.access = undefined;
      state.refresh = undefined;
      state.logged = false;

      Storage.remove("access");
      Storage.remove("refresh");
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
};
