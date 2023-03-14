import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn muốn nhận thêm nhiều thông tin khác?</h2>
              <p>Đăng ký và nhận thông tin mới nhất</p>
              <form className="form-section">
                <input placeholder="Email của bạn" name="email" type="email" />
                <input value="Gửi tôi thông tin" name="Đăng ký" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
