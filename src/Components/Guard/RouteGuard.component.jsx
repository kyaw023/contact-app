import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routeLoading from "../../assets/routeLoading.json";
import { useUserProfileQuery } from "../../store/endpoints/auth.endpoints";
import LoadingComponent from "../Loading/Loading.component";

const RouteGuardComponent = ({ check, token, children }) => {
  const { data, isError, isLoading, isSuccess } = useUserProfileQuery();

  const nav = useNavigate();

  useEffect(() => {
    if (check) {
      localStorage.setItem("token", JSON.stringify(token));
    } else if (isError) {
      nav("/");
    } else if (isSuccess) {
      nav("/home");
    }
  }, [check, data, isError]);
  return (
    <div>
      {isLoading ? <LoadingComponent data={routeLoading} /> : <>{children}</>}
    </div>
  );
};

export default RouteGuardComponent;
