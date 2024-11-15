import React from "react";

import { Header } from "./header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
 
export const MainLayout = () => {
  return (
    <>
     
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        justifyContent="space-between"
      >
        <Box component="header">
          <Header />
        </Box>

      </Box>
    </>
  );
};
