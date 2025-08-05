import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export interface LoginRequest {
  password: string;
  username: string;
}

const useLoginViewModel = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const loginRequest: LoginRequest = {
      password: password,
      username: username,
    };

    try {
      const data = await login(loginRequest.username, loginRequest.password);
      if (data) {
        setError("");
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
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
