import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../styles/theme";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/slice/loginSlice";
import { Outlet } from "react-router-dom";
import { useSnackbar } from "notistack";

//styled(Box)((theme) => ({
const BoxContainer = styled(Box)(({ theme }) => ({
  maxWidth: "550px",
  minWidth: "380px",
  height: "450px",
  borderRadius: theme.borderRadius[5],
  margin: "auto",
  display: "flex",
  flexDirection: "column",

  padding: "20px",
  background: theme.palette.neutral[10],
  boxShadow: theme.boxShadow.shadowOne,
  "& .MuiTextField-root": {
    margin: "16px 0",
  },
  "& h4": {
    letterSpacing: "-0.021em",
    color: theme.palette.neutral[100],
    textAlign: "center",
    marginBottom: "15px",
    ...theme.typography.h4,
  },

  "& h6": {
    letterSpacing: "-0.006em",
    color: theme.palette.neutral[90],
    textAlign: "center",
    marginBottom: "16px",
    ...theme.typography.textMedium,
  },
}));
const BgColor = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100vh",

  display: "flex",
  flexDirection: "column",
}));
const TextFieldInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    height: "34px",
    borderRadius: theme.borderRadius[3],
    boxShadow: theme.boxShadow.innerShadow,

    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
const Label = styled("label")(({ theme }) => ({
  color: theme.palette.neutral[100],
}));

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    tokenKey: true,
  });
  console.log(userInfo, "userInfo");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  //   const navigate=useNaviga
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.password) {
      enqueueSnackbar("Please fill all the fields", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
          autoHideDuration: 1000,
        },
      });
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/loginDB");
      console.log(response);
      const data = await response.data;
      console.log(data);

      if (response.status === 200) {
        const { email, password } = data;
        if (userInfo.email === email && userInfo.password === password) {
          enqueueSnackbar("Login Success", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "bottom",
              autoHideDuration: 1000,
            },
          });

          dispatch(loginActions(userInfo));
        }
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",

        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
          autoHideDuration: 2000,
        },
      });
    }

    setUserInfo({
      email: "",
      password: "",
    });
  };

  return (
    <BgColor>
      <BoxContainer>
        <h4>Welcome Back</h4>
        <h6>Log in to your account</h6>
        <Label>Email</Label>
        <TextFieldInput
          type="email"
          value={userInfo.email}
          placeholder="Email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <Label>Password</Label>
        <TextFieldInput
          type="password"
          value={userInfo.password}
          placeholder="Password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            background: theme.palette.secondary.main,
            borderRadius: theme.borderRadius[3],
            boxShadow: theme.boxShadow.shadowOne,
            height: "40px",

            fontSize: "15px",
            textTransform: "none",
            margin: "16px 5px 0 ",
            "&:hover": {
              background: theme.palette.secondary.main,
            },
          }}
          onClick={handleSubmit}
        >
          Log in
        </Button>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textAlign: "center",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Forgot password?
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, margin: "16px 5px 0px 0px" }} />
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Don't have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Sign up
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
          }}
        >
          or{" "}
          <Typography
            component="span"
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",

              fontSize: "13px",
            }}
          >
            Back to website
          </Typography>
        </Typography>
      </BoxContainer>
    </BgColor>
  );
};

export default LoginPage;
