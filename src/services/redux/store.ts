import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
import rootReducer from "./root-reducer";

const logger = createLogger()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type AppDispatch = typeof store.dispatch
export default store