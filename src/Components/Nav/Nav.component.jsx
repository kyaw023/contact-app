import React, { useEffect } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/ui/avatar";
import { Button } from "../ui/button";
import { useLogoutMutation } from "../../store/endpoints/auth.endpoints";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NavComponent = () => {
  const [logoutHandlerFun, { isError, isLoading, isSuccess }] =
    useLogoutMutation();

  const nav = useNavigate();

  console.log(isSuccess);

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    await logoutHandlerFun();
    nav("/");
    toast.success("Logout Successfuly");
  };

  return (
    <div className=" center-between border-b-2 py-3 shadow-sm px-2 bg-white">
      <h1 className=" text-blue-600 text-2xl font-semibold">TouchBase</h1>
      <div className=" flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
