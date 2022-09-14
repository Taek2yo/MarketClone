import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createList } from "../../redux/modules/signupSlice";
import axios from "axios";

const Signup = (props) => {


  // const A = async()=>{
  //   const b = await axios.get(url), {data}
  // }
  const axiosSignUp = async()=>{
    if(nickname.current.value ===""){
      window.alert("이름을 입력해주세요!");
      return 
    }
    try{
      const res = await axios.post("http://13.209.26.228:8080/api/user/signup",{
      username : username.current.value,
      password : password.current.value,
      passwordConfirm : passwordConfirm.current.value,
      nickname: nickname.current.value
    });
    window.alert(res.data);
    console.log(res);
    navigate("/login");
  }
    catch(e){
      // if(e.response.data.message==="아이디는 3자 이상 입력해주세요")
      // console.log(e.response.data.message);
      window.alert(e.response.data.message);
    }

  }
  
  const username = React.useRef(null);
  const password = React.useRef(null);
  const passwordConfirm = React.useRef(null);
  const nickname = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const my_lists = useSelector((state) => state.signupSlice);
  // console.log(my_lists);

  const saveWord = (e) => {
    e.preventDefault();
    console.log(username.current.value);
    console.log(password.current.value);
    console.log(passwordConfirm.current.value);
    console.log(nickname.current.value);

    const new_word = {
      username: username.current.value,
      password: password.current.value,
      passwordConfirm: passwordConfirm.current.value,
      nickname: nickname.current.value,
    };
    dispatch(createList(new_word));
  };

  // const axiosSignUp = async() => {
  //   const responce = await axios.post("http://13.209.65.84/user/signup",{
  //     username: username.current.value,
  //     password: password.current.value,
  //     passwordConfirm: passwordConfirm.current.value,
  //     nickname: nickname.current.value,
  //   });
  //   console.log(responce);
  //   window.alert(responce.data)
  //   navigate("/");
  // }

  return (
    <Wrap>
      <Title>
        <h2>회원가입</h2>
      </Title>
      <SignupWrap>
        <p>
          <span>*</span>필수입력사항
        </p>
        <form onSubmit={(e) => saveWord(e)}>
          <InputWrap>
            <Label>
              아이디 <span>*</span>
            </Label>
            <InputTag>
              <Input
                type="text"
                placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
                ref={username}
              />
              {/* 백에서 중복확인 없애셔서 우리도 이버튼 필요없음! */}
              <CheckButton>중복확인</CheckButton>
            </InputTag>
          </InputWrap>

          <InputWrap>
            <Label>
              비밀번호 <span>*</span>
            </Label>
            <InputTag>
              <Input
                type="text"
                placeholder="비밀번호를 입력해주세요"
                ref={password}
              />
            </InputTag>
          </InputWrap>

          <InputWrap>
            <Label>
              비밀번호확인 <span>*</span>
            </Label>
            <InputTag>
              <Input
                type="text"
                placeholder="비밀번호를 한번 더 입력해주세요"
                ref={passwordConfirm}
              />
            </InputTag>
          </InputWrap>

          <InputWrap>
            <Label>
              닉네임 <span>*</span>
            </Label>
            <InputTag>
              <Input
                type="text"
                placeholder="닉네임을 입력해주세요"
                ref={nickname}
              />
            </InputTag>
          </InputWrap>
          <SignupButtonWrap>
            <SignupButton
              onClick={() => {
                axiosSignUp();
              }}
            >
              가입하기
            </SignupButton>
          </SignupButtonWrap>
        </form>
      </SignupWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1050px;
  height: 600px;
  margin: 0 auto;
  padding-top: 30px;
  // background-color: beige;
`;

const Title = styled.div`
  width: 1050px;
  margin: 0 auto;
  padding: 50px 0 20px;

  h2 {
    margin: 0;
    text-align: center;
  }
`;

const SignupWrap = styled.div`
  width: 640px;
  height: 30px;
  margin: 0 auto;
  p {
    text-align: right;
    padding-bottom: 10px;
    font-size: 12px;
    color: #666;
    border-bottom: 2px solid black;
  }
  span {
    padding-right: 2px;
    color: #ee6a7b;
  }
`;

const InputWrap = styled.tr`
  /* background-color: beige; */
  display: flex;
`;

const Label = styled.th`
  padding-top: 29px;
  width: 159px;
  padding: 20px 0 0 20px;
  font-weight: 700;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  vertical-align: top;
  text-align: left;
`;

const InputTag = styled.td`
  padding-top: 19px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  border-radius: 3px;
  background: #fff;
  outline: none;
  vertical-align: top;
`;

const CheckButton = styled.button`
  border: 1px solid #5f0080;
  background-color: #fff;
  color: #5f0080;
  width: 115px;
  height: 40px;
  margin-left: 5px;
  border-radius: 3px;
`;

const SignupButtonWrap = styled.div`
  margin-top: 30px;
  border-top: 1px solid rgb(247, 247, 247);
  padding-top: 40px;
  text-align: center;
`;

const SignupButton = styled.button`
  width: 210px;
  height: 50px;
  font-size: 16px;
  border: 1px solid #5f0081;
  background-color: #5f0080;
  color: #fff;
  border-radius: 5px;
`;

export default Signup;