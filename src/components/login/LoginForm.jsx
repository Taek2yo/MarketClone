import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = ({ is_login, setIsLogin }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let [loginId, setLoginId] = useState("");

  let sessionStorage = window.sessionStorage;

  const username = React.useRef(null);
  const password = React.useRef(null);

  const axiosLogin = async () => {
    try {
      const res = await axios.post("http://13.209.26.228:8080/api/user/login", {
        username: username.current.value,
        password: password.current.value,
      })
      // console.log(res.headers.authorization);
      if (res.status === 200 && res.headers.authorization) {
        sessionStorage.setItem("Authorization", res.headers.authorization);
        sessionStorage.setItem("username", username.current.value); // header에 쓸 username 세션에 담기
        window.alert("로그인 하셨습니다!");
        navigate("/");
      }
    } catch (e) {
      window.alert("로그인 정보를 다시 확인해주세요!")
    }

  };
  // sessionStorage.setItem("token", res.headers.authorization)


  return (
    <div>
      <LoginWrap>
        <h3>로그인</h3>
        <InputId
          type="text"
          placeholder="아이디를 입력해주세요"
          ref={username}
        // onChange={(e) => {
        //   setLoginId(e.target.value);
        // }}
        />
        <InputPw
          type="password"
          placeholder="비밀번호를 입력해주세요"
          ref={password}
        />
        <LoginButton
          onClick={() => { axiosLogin(); }}
        >
          로그인
        </LoginButton>

        <SignupButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </SignupButton>
      </LoginWrap>
    </div>
  );
};

const LoginWrap = styled.div`
  width: 340px;
  margin: 0 auto;
  padding-top: 90px;
  padding-bottom: 120px;
  /* background-color: aliceblue; */
  h3 {
    font-weight: 800;
    font-size: 20px;
    text-align: center;
  }
`;

const InputId = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 19px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  margin: 25px 0 10px;
`;

const InputPw = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 19px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
  margin: 20px 0 10px;
  border: 1px solid #5f0081;
  background-color: #5f0080;
  color: white;
`;

const SignupButton = styled.button`
  width: 100%;
  height: 54px;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #5f0081;
  background-color: white;
  color: #5f0080;
`;

export default Login;
