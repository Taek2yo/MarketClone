import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from "./instance";
import axios from 'axios';

// 초기값 선언
const initialState = {
  isSignupSucceed: false,
  isIdUsable: false,
};

export const __SignUp = createAsyncThunk(
  "api/member/signup",
  async (payload, thunkAPI) => {
      try {
          console.log(payload)
          const data =  await axios.post("http://13.209.26.228:8080/api/user/signup", payload);
          console.log(data.data)
          return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error);
        }
  }
);

// id중복확인 thunk함수
export const idCheckThunk = createAsyncThunk(
  "signupSlice/idCheckThunk",
  async (payload, thunkAPI) => {
  }
);


// 슬라이스
const signupSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetsignupState: (state, action) => {
      state.isSignupSucceed = false;
      state.isIdUsable = false;
    },
  },
  extraReducers: {
    [__SignUp.fulfilled]: (state, action) => {
      // action.payload = response.data
      alert("가입이 완료되었습니다.");
      state.isSignupSucceed = true;
    },
    [__SignUp.rejected]: (state, action) => {
      alert("다시 시도해주세요.");
      state.isSignupSucceed = false;
    },
    [idCheckThunk.fulfilled]: (state, action) => {
      state.isIdUsable = true;
      alert(action.payload.Message);// 사용 가능한 아이디 입니다.
    },
    [idCheckThunk.rejected]: (state, action) => {
      state.isIdUsable = false;
      // alert(action.payload.errorMessage);
      console.log(action.payload.errorMessage)  // 중복된 아이디 입니다.
    }
  },
});

//action 데이터로 받음 action 확인
// reducer export
export const { resetSignupState } = signupSlice.actions;

// extra reducer export
export default signupSlice;
