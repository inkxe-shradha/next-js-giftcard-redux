import React from "react";
import { useRouter } from "next/router";
import Spinner from "../Spinner/Spinner";

const ProtectedRout = ({ children, currentStatus: status }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!status) {
      router.push("/");
    }
  }, [status, router]);
  if (status) {
    return children;
  } else {
    return (
      <Spinner isLoading={status === "loading"} backGroundColor="#000000db" />
    );
  }
};

export default ProtectedRout;
