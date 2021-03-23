import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store/store';

// We're going to want a slice for the containers object. We're going to want to pull
// down as much data as we can at once and then cache it.

const ContainerListSlice = createSlice({
  initialState: {},
  reducers: {},
  name: 'container-list-slice',
});

export const getAllContainers = (): AppThunk => {
  return async (dispatch) => {};
};
