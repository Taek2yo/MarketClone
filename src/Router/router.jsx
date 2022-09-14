import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Detail from "../pages/Detail";
import Newest from "../pages/Newest";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Join />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/newest" element={<Newest />} />
     
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
