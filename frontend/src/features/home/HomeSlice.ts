import { createSlice } from '@reduxjs/toolkit';

export enum Status {
  ON,
  DEGRADED,
  OFF,
}

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
});

export default homeSlice.reducer;
