// const { createSlice } = require('@reduxjs/toolkit');

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//   },
//   reducers: {
//    setuser:(state, action) => {
//     state.user = action.payload;
//    }
    
//     },
// });
// module.exports = authSlice.reducer;
// export const { setuser } = authSlice.actions;


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

