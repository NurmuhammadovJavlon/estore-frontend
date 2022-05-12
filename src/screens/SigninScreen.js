import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { register, signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen() {
  // sign In part
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  
  // register part
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { registerloading, registererror } = userRegister;
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      alert('Parol va Tasdqilash Paroli mos kelmadi!');
    } else{
      dispatch(register(name, registerEmail, registerPassword));
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={submitHandler} className="sign-in-form">
            <h2 className="title">Profilga Kirish</h2>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form
            onSubmit={registerSubmitHandler}
            className="sign-up-form"
          >
            <h2 className="title">Ro'yxatdan o'tish</h2>
            {registerloading && <LoadingBox></LoadingBox>}
            {registererror && <MessageBox variant="danger">Error. Boshqa email kiritib ko'ring.</MessageBox>}
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="signin-panel left-panel">
          <div className="content">
            <h3>Akkauntingiz yo'qmi?</h3>
            <p>
              Unda hoziroq ro'yxatdan o'ting va turli xil mahsulotlarni sotib
              olishni boshlang!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={(e) => {
                const container = e.target.closest(".container");
                container.classList.add("sign-up-mode");
              }}
            >
              Qani Kettik...
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="signin-panel right-panel">
          <div className="content">
            <h3>"Uje" a'zomisiz?</h3>
            <p>
              Unda profilingizga kirib mahsulotlarga buyurtma berishni boshlang.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={(e) => {
                const container = e.target.closest(".container");
                container.classList.remove("sign-up-mode");
              }}
            >
              Kirish
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
