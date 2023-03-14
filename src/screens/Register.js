import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/Actions/UserActions";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit">Nhà thuốc tư nhân</Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /**Lấy ra từ Store */
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Tên người dùng"
            value={name}
            minLength="3"
            maxLength="25"
            title="Tên người dùng ngắn nhất là 3 ký tự và dài nhất là 25"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            title="Vui lòng nhập đầy đủ Email: example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            title="Mật khẩu có ít nhất 1 chữ hoa, 1 thường và 1 chữ số."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 
          <input
            className="form-control"
            type="password"
            placeholder="Xác nhận mật khẩu"
            title="Vui lòng nhập đúng mật khẩu đã nhập ở trên"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Tạo tài khoản
          </Button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Đã có tài khoản? <strong>Đăng nhập</strong>
            </Link>
          </p>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
    </>
  );
};

export default Register;
