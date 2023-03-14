import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [ward, setWard] = useState(shippingAddress.ward);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [city, setCity] = useState(shippingAddress.city);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, ward, district, city }));
    history.push("/payment");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>Địa chỉ giao hàng</h6>
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nhập phường"
            value={ward}
            required
            onChange={(e) => setWard(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nhập quận"
            value={district}
            required
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nhập thành phố"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
