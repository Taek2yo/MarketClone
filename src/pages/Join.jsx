import React from "react";
import Header from "../Common/Header/Header";
import Layouts from "../Common/Layout";
import SignupForm from "../components/Join/SignupForm";

function Signup() {
  return (
    <>
      <Header />
      <Layouts>
          <SignupForm></SignupForm>
      </Layouts>
    </>
  );
}

export default Signup;
