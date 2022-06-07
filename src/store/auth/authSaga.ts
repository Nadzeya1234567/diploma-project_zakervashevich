import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, spawn, takeEvery, takeLeading } from "redux-saga/effects";
import sagaApi from "../../helpers/sagaApi";
import FormValuesType from "../../types/FormValuesType";
import ProfileType from "../../types/ProfileType";
import { authActions } from "./authSlice";

type CreateTokensType = {
  data: {
    access: string;
    refresh: string;
  };
};

const CreateTokensWatcher = function* () {
  yield takeLeading(authActions.createTokens.type, CreateTokensWorker);
};

const CreateTokensWorker = function* ({ payload }: PayloadAction<FormValuesType>) {
  yield put(authActions.setAuthLoading(true));
  yield put(authActions.setAuthError(false));
  try {
    if (payload.login === "book@mail.ru" && payload.password === "1234567") {
      const data = {
        access: "asdfghjkl",
        refresh: "qwertyuio",
      };
      yield put(authActions.setLogged(payload.logged));
      yield put(authActions.setAccess(data.access));
      yield put(authActions.setRefresh(data.refresh));
    } else {
      throw new Error();
    }
  } catch {
    yield put(authActions.setAuthError(true));
  } finally {
    yield put(authActions.setAuthLoading(false));
  }
};

const authSaga = function* () {
  yield all([/* spawn(fetchProfileWatcher), */ spawn(CreateTokensWatcher)]);
};

export default authSaga;
