import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

const sagaMidleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMidleware,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);
