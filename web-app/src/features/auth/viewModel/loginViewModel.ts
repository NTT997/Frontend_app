import React, { useState } from "react";
import { authenticate } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../store/userSlice";

import type { userLogin } from "@ui/shared-models";
import { fetchUserById } from "../../../services/UserService";

const useLoginViewModel = () => {
  const navigate = useNavigate();

  //login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //logout
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //err
  const [error, setError] = useState("");

  //redux
  const dispatch = useDispatch();
  //------------------------------

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const loginData: userLogin = {
      username: username,
      password: password,
    };

    try {
      console.log(loginData);
      const data = await authenticate(loginData);
      console.log(data);

      if (data) {
        setError("");
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);

        const user = await fetchUserById(data.id);
        dispatch(login({ id: data.id, email: user.emailAddress }));

        alert("Đăng nhập thành công");

        navigate("/dashboard");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  return {
    //login
    username,
    setUsername,
    password,
    setPassword,
    //error
    error,
    setError,
    //handle
    handleLogin,
    handleLogout,
    //logout
    anchorEl,
    open,
    handleClick,
    handleClose,
  };
};

export default useLoginViewModel;
