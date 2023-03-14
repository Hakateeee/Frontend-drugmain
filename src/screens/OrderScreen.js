import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
//npm của Paypal để them button paypal
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
// import axios from "axios";
// import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import { ORDER_PAY_RESET } from "./../Redux/Constants/OrderConstants";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  //Todo
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed();
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  /**Khi orderId thay đổi hoặc lần đầu tiên orderId được truyền vào,
   *useEffect sẽ được gọi. Trong callback function này,
   *server sẽ được gọi để lấy thông tin chi tiết của đơn
   *hàng có mã orderId thông qua dispatch(getOrderDetails(orderId)). */
  useEffect(() => {
    //Gọi API PayPal
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  //paypal function
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Khách hàng</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* 2 */}

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Thông tin mua hàng</strong>
                    </h5>
                    <p>Giao đến: {order.shippingAddress.city}</p>
                    <p>Hình thức thanh toán: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Thanh toán ngày {moment(order.paidAt).format("l")}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa thanh toán
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 */}

              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Giao hàng đến</strong>
                    </h5>
                    <p>
                      Địa chỉ: {order.shippingAddress.address}, ,
                      {order.shippingAddress.ward}, ,
                      {order.shippingAddress.district}, ,
                      {order.shippingAddress.city}{" "}
                    </p>

                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã giao hàng vào ngày{" "}
                          {moment(order.deliveredAt).format("l")}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa giao hàng
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>Số lượng</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>Tổng cộng</h4>
                          <h6>{item.qty * item.price} VNĐ</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* Tông cộng */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Sản phẩm</strong>
                      </td>
                      <td>{order.itemsPrice} VNĐ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phí giao hàng</strong>
                      </td>
                      <td>{order.shippingPrice} VNĐ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Thuế</strong>
                      </td>
                      <td>{order.taxPrice} VNĐ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng cộng</strong>
                      </td>
                      <td>{order.totalPrice} VNĐ</td>
                    </tr>
                  </tbody>
                </table>

                {/**PayPalButton là một npm hỗ trợ tạo ra button Paypal để thanh
                 * toán qua PayPal hoặc thêm credit card vào để thanh toán
                 * Ở đây em dùng mỗi PayPal để thanh toán để test chức năng
                 * đã thanh toán hoặc chưa của người dùng khi chưa tạo ra Admin.
                 */}

                {/**gọi order.isPaid kiểm tra thanh toán
                 * nếu chưa hiện loading cho tới khi thanh toán
                 * nếu sdkReady = true render tiền
                 * thanh toán thành công gọi successPaymentHandler
                 */}

                {!order.isPaid && (
                  <div className="col-12">
                    {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
