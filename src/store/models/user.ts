import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { menuListApi, userInfoApi } from "../../services";
import { MenuItem, UserInfo } from "../../type";


export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const res = await Promise.all([userInfoApi(), menuListApi()])
  return {
    userInfo: res[0].data,
    menuLsit: res[1].data
  }
})

interface State {
  loading: boolean,
  userInfo: UserInfo | null,
  menuList: MenuItem[]
}

const initialState: State = {
  loading: false,
  userInfo: null,
  menuList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(getUserInfo.pending, (state) => {
      state.loading = true
    })
    .addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload.userInfo.data
      state.menuList = action.payload.menuLsit.data.list
    })
  }
})

export const {} = userSlice.actions

export default userSlice.reducer