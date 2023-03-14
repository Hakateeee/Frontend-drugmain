import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginationn = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={5} color="primary" />
    </Stack>
  );
};

export default Paginationn;
