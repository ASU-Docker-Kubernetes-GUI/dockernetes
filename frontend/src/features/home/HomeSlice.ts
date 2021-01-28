import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';

export enum Status {
  ON,
  DEGRADED,
  OFF,
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    dockerStatus: Status.OFF,
    apiStatus: Status.OFF,
  },
  reducers: {
    dockerReady: (state) => {
      state.dockerStatus = Status.ON;
    },
    dockerDegraded: (state) => {
      state.dockerStatus = Status.DEGRADED;
    },
    dockerOff: (state) => {
      state.dockerStatus = Status.OFF;
    },
    apiOn: (state) => {
      state.dockerStatus = Status.OFF;
    },
    apiDegraded: (state) => {
      state.dockerStatus = Status.OFF;
    },
    apiOff: (state) => {
      state.dockerStatus = Status.OFF;
    },
  },
});

export const checkApiStatus = (): AppThunk => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8080/api/v1/ping');
    if (!response.ok) {
      dispatch(apiOff());
    } else if (response.status >= 300 && response.status < 500) {
      dispatch(apiDegraded());
    } else {
      dispatch(apiOn());
    }
  };
};

export const checkDockerStatus = (): AppThunk => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8080/api/v1/status');
    if (!response.ok || response.status > 500) {
      dispatch(dockerOff());
    } else if (response.status >= 300 && response.status < 500) {
      dispatch(dockerDegraded());
    } else {
      dispatch(dockerReady());
    }
  };
};

export const {
  dockerReady,
  dockerDegraded,
  dockerOff,
  apiOn,
  apiDegraded,
  apiOff,
} = homeSlice.actions;

export default homeSlice.reducer;

export const getDockerStatus = (state: RootState) => state.home.dockerStatus;
export const getApiStatus = (state: RootState) => state.home.apiStatus;
