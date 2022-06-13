import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
  });

  sagaMiddleware.run(sagas);

  return store;
};

const store = getStore();

export default store;
