import React, { useState } from "react";
import { authenticate } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../store/userSlice";

import type { userLogin } from "@ui/shared-models";

const useLoginViewModel = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const data = await authenticate(loginData);
      if (data) {
        setError("");
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);

        dispatch(login(data.id));

        alert("Đăng nhập thành công");

        navigate("/dashboard");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleLogin,
  };
};

export default useLoginViewModel;
