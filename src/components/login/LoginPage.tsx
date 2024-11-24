import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./login-page.css";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/login`,
        data,
      );
      localStorage.setItem("token", response.data.token);
      navigate("/products");
    } catch (error) {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="page">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="username">Username</label>
          <TextField
            type="text"
            {...register("username", { required: "username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className="login-button">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
      <div>
        <Link
          className="continue-as-guest"
          to="/products"
          style={{ cursor: "pointer" }}
        >
          Continue as a Guest
        </Link>
      </div>
    </div>
  );
}
