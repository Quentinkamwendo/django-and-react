// RegistrationForm.js

// import React from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useAuth } from '../ContextProvider';
// import { useState } from 'react';
import { useContext } from "react";
// import axiosClient from '../axios'
import { StateContext } from "./../ContextProvider";
function LoginForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setError } = useForm();
  const navigate = useNavigate();
  const { setAuthData, loading, setLoading } = useContext(StateContext);

  let loginId;

  const { mutate, isError, error } = useMutation(
    async (data) => await axios.post("/api/auth/login/", data),
    {
      onSuccess: (response) => {
        setLoading(false);
        toast.success("Registration successful 🚀", {
          id: loginId,
          duration: 5000,
        });
        const token = response.data.token; // Assuming the token is returned in the response
        const user = response.data.user; // Assuming the user is returned in the response
        setAuthData(token, user);
        // sessionStorage.setItem('token', token);
        queryClient.setQueryData(["token"], token);
        navigate("/dashboard");
      },
      onError: (error) => {
        setLoading(false);
        toast.error(error.response.data.message, { id: loginId });
        setError("username", { message: error.response.data.username });
        setError("password", { message: error.response.data.password });
      },
    }
  );

  const onSubmit = (data) => {
    loginId = toast.loading("logging in ⚠", { id: loginId });
    setLoading(true);
    mutate(data);
    toast.remove(loginId);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            {...register("username")}
            className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
            id="username"
            type="text"
            placeholder="Username"
            required
          />
          <p className="text-red-500 text-xs italic">
            {isError ? error.message : null}
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            className="shadow form-input rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading && <CircularProgress color="inherit" />}
            Login
          </button>
        </div>
      </form>
      <p className="bg-gradient-to-r from-yellow-300 via-slate-400 to-cyan-500">
        Already have an account &nbsp;
        <Link
          className="font-semibold text-violet-600 hover:text-violet-800"
          to={"/auth/register"}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
