import React from "react";
import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutActions } from "../redux/slice/loginSlice";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
const NavBar = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  overflow: "hidden",
  zIndex: 100,
  width: "100%",
  height: "50px",
  display: "flex",
  alignItems: "center",

  backgroundColor: theme.palette.neutral[10],
  color: "black",
}));
const Modal = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const ModalContent = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
  marginTop: "20px",
}));
const Home = () => {
  const islogged = localStorage.getItem("tokenKey");
  const [open, setOpen] = React.useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const closeModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOutActions());

    enqueueSnackbar("Logout successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    closeModal();
  };
  return (
    <div>
      <NavBar>
        <ul
          style={{
            listStyleType: "none",

            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-around",
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {islogged ? (
              <Link to="/" onClick={openModal}>
                Logout
              </Link>
            ) : (
              <Link to="/">Login</Link>
            )}
          </li>
          <li>
            <Link to="/maps">Maps</Link>
          </li>
          <li>{islogged && <Link to="/todo">Todo</Link>}</li>
        </ul>
      </NavBar>
      {open && (
        <Modal onClick={closeModal}>
          <ModalContent>
            <h3>Are you sure you want to logout?</h3>
            <div style={{ display: "flex", gap: "20px" }}>
              <ModalButton onClick={closeModal}>Cancel</ModalButton>
              <ModalButton onClick={logoutHandler}>Logout</ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
