import {
  createSlice,
  createAsyncThunk,
  createAction,
  Slice,
  Actions,
  CaseReducerActions,
} from '@reduxjs/toolkit';
import { DockernetesClient } from '../../api/DockernetesClient';
import { AppThunk, RootState } from '../../store/store';
import { Client } from '../../api/Client';

export enum Status {
  ON,
  DEGRADED,
  OFF,
}

const dockernetesClient = new Client();

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    apiStatus: Status.OFF,
    environmentName: '',
    containerCount: 0,
    dockerRootDirectory: '',
    cpuCount: 0,
    memoryCount: 0,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: {
    [fetchApiStatus.pending]: (state, action) => {
      state.apiStatus = Status.DEGRADED;
    },
    [fetchApiStatus.fulfilled]: (state, action) => {
      state.apiStatus = action.payload;
    },
    [fetchApiStatus.rejected]: (state, action) => {
      state.apiStatus = Status.OFF;
    },
    [fetchDockerStatus.fulfilled]: (state, action) => {},
  },
});

export const fetchApiStatus = createAsyncThunk(
  'home/fetchApiStatus',
  async () => {
    let response;
    try {
      response = await dockernetesClient.ping();
    } catch (e) {
      return Status.OFF;
    }

    return Status.ON;
  },
);

export const fetchDockerStatus = createAsyncThunk(
  'home/fetchDockerStatus',
  async () => {
    let response = await dockernetesClient.getStatus();
    return response;
  },
);

export default homeSlice.reducer;
