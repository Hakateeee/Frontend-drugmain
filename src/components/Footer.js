import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Footer = () => {
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
  return <Copyright sx={{ mt: 8, mb: 4 }} />;
};

export default Footer;
