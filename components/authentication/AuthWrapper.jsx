import React from "react";
import { useSession } from "next-auth/react";
import Spinner from "../Spinner/Spinner";
import { useRouter } from "next/router";
import ProtectedRout from "./ProtectedRout";
import { loginSuccess } from "../../stores/actions/authAction";
import { useDispatch } from "react-redux";

const authRoutes = ["/users", "/users/gift-sent", "/users/gift-received"];
const AuthWrapper = (
  { children, session: { user = null } } = { user: null }
) => {
  const dispatch = useDispatch();
  const { pathname: path } = useRouter();
  React.useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [user, dispatch]);
  const { status } = useSession();

  if (authRoutes.includes(path)) {
    return <ProtectedRout currentStatus={!!user}>{children}</ProtectedRout>;
  } else {
    return (
      <>
        <Spinner isLoading={status == "loading"} backGroundColor="#000000db" />
        {children}
      </>
    );
  }
};
export default AuthWrapper;
