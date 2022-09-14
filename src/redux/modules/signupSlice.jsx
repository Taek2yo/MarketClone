import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./instance";

// 초기값 선언
const initialState = {
  isSignupSucceed: false,
  isIdUsable: false,
};

// thunk함수(회원가입) 선언
export const signupThunk = createAsyncThunk(
  "signupSlice/signupThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("api/user/signup", payload);
      // console.log(response);
      return thunkAPI.fulfillWithValue(response.data); //thunkAPI를 이용해 통신 성공할 시 값 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response); //통신 실패시 에러값 반환
    }
  }
);

// id중복확인 thunk함수
export const idCheckThunk = createAsyncThunk(
  "signupSlice/idCheckThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("api/user/idCheck", {
        key: "username",
        value: payload,
      });
      return thunkAPI.fulfillWithValue(response.data); //thunkAPI를 이용해 통신 성공할 시 값 반환
    } catch (iderror) {
      return thunkAPI.rejectWithValue(iderror.response.data); //통신 실패시 에러값 반환
    }
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
    [signupThunk.fulfilled]: (state, action) => {
      //action.payload = response.data
      alert("가입이 완료되었습니다.");
      state.isSignupSucceed = true;
    },
    [signupThunk.rejected]: (state, action) => {
      alert("다시 시도해주세요.");
      state.isSignupSucceed = false;
    },
    [idCheckThunk.fulfilled]: (state, action) => {
      state.isIdUsable = true;
      alert(action.payload.Message); // 사용 가능한 아이디 입니다.
    },
    [idCheckThunk.rejected]: (state, action) => {
      state.isIdUsable = false;
      alert(action.payload.errorMessage); // 중복된 아이디 입니다.
    }
  },
});

// reducer export
export const { resetSignupState } = signupSlice.actions;

// extra reducer export
export default signupSlice;
