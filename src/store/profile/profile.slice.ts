import { createSlice } from '@reduxjs/toolkit';
import { TProfileState } from '../../types/profile';
import { TReduxAction } from '../../types/common';

const initialState: TProfileState = {
  profileName: ''
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfileName(state, action: TReduxAction<string>) {
      state.profileName = action.payload;
    }
  }
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
