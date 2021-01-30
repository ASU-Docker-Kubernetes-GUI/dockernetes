import {Action, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {routerMiddleware} from 'connected-react-router';
import {createHashHistory} from 'history';
import {createLogger} from 'redux-logger';
import {ThunkAction} from 'redux-thunk';
import createRootReducer from './rootReducer';
import LogRocket from 'logrocket';

export const history = createHashHistory();
const router = routerMiddleware(history);
const middleware = [
  ...getDefaultMiddleware(),
  router,
  LogRocket.reduxMiddleware(),
];

const rootReducer = createRootReducer(history);

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  process.env.NODE_ENV || '',
);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);
}

export type RootState = ReturnType<typeof rootReducer>;

export const configuredStore = (initialState?: RootState) => {
  return configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    middleware: middleware,
  });
};

export const getCurrentPathname = (state: RootState) =>
  state.router.location.pathname;
export type Store = ReturnType<typeof configuredStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
