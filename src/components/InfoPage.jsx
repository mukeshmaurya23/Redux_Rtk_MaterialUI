import styled from "@emotion/styled";
import { Box, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const BgColor = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100vh",

  display: "flex",
  flexDirection: "column",
}));
const UserCard = styled(Paper)(({ theme }) => ({
  height: "100px",
  width: "300px",
  borderRadius: theme.borderRadius[5],
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
}));
const InfoPage = () => {
  // const user = useSelector((state) => state.login.user);
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);
  return (
    <BgColor>
      <UserCard>
        <h3
          style={{
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          User InfoPage
        </h3>
        <h4>{user?.email}</h4>
        <h4>{user?.password}</h4>
      </UserCard>
    </BgColor>
  );
};

export default InfoPage;
