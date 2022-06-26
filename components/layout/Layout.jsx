import React from "react";
import Footer from "./footer/footer";
import Header from "./header/header";
import { ToastContainer } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../stores/actions/authAction";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  page: {
    background: theme.palette.background.default,
    width: "100%",
    flexGrow: 1,
    minHeight: "100vh",
    paddingBlock: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));
const Layout = ({ children }) => {
  const { status, data: session } = useSession();
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const handelLogOut = () => {
    dispatch(logOutUser({}));
  };
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      {/* Header Section */}
      <Header
        authStatus={status === "authenticated"}
        user={session?.user}
        logOut={handelLogOut}
      />
      {/* Main content Section */}
      <main className={classes.page}>
        {router.pathname !== "/login" && (
          <div className={classes.toolbar}></div>
        )}
        {children}
      </main>
      {/* Footer Section */}
      <Footer />
      {/* Toaster Container Library */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        position="bottom-center"
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="dark"
      />
      {/* Global Spinner */}
      {loading && <Spinner isLoading={loading} />}
    </>
  );
};

export default Layout;
