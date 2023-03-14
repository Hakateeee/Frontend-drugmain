import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { login } from "./../Redux/Actions/UserActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


/**useSelector để lấy dữ liệu từ store*/
const Login = ({ location, history }) => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /**Lấy dữ liệu userLogin từ trong store thông qua useSelector */
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  /**Xử lý logic trong component và gọi khi component có sự thay đổi
   * ở đây là gọi userInfo khi có sự thay đổi hoặc lần đầu được truyền vào
   */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Nhớ tài khoản"
            sx={{ mu: 5, mr:30 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>

          <p>
            <Grid item>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Bạn chưa có tài khoản? <strong>Đăng ký</strong>
              </Link>
            </Grid>
          </p>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
    </>
  );
};

export default Login;
