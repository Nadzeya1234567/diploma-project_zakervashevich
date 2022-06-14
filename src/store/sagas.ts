import { all, spawn } from "redux-saga/effects";
import authSaga from "./auth/authSaga";

const sagas = function* () {
  yield all([spawn(authSaga)]);
};
export default sagas;
