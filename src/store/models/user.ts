import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { menuListApi, updateUserInfoApi, userInfoApi } from "../../services";
import { MenuItem, UserInfo } from "../../type";


export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const res = await Promise.all([userInfoApi(), menuListApi()])
  return {
    userInfo: res[0].data,
    menuLsit: res[1].data
  }
})

export const updateUserInfo = createAsyncThunk('updateUserInfo', async (userInfo: UserInfo) => {
  const res = await updateUserInfoApi(userInfo)
  return res.data
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
    .addCase(getUserInfo.rejected, (state) => {
      state.loading = false
    })
    .addCase(updateUserInfo.fulfilled, (state, action) => {
      if (state.userInfo) {
        state.userInfo = {...state.userInfo, ...action.payload}
      }
    })
  }
})

export const {} = userSlice.actions

export default userSlice.reducer