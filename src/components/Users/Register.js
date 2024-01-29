import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";
import { registerAction } from "../../redux/slices/users/usersSlicess";

const Register = () => {
  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  // store data
  const { user, error, success, loading } = useSelector(
    (state) => state?.users
  );

  // Redirect 
  useEffect(() => {
    if(user?.status === "success"){
        navigate('/login')
    }
}, [navigate, user?.status])


  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
      <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
        <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
          Join our community
        </h2>
        {/* Display error */}
        {error && <ErrorMsg message={error?.message} />}

        {/* Display  success*/}
        {success && <SuccessMsg message="Register successfull" />}
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Username</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            name="username"
          />
        </label>
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Email</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            placeholder="Enter your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Password</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </label>
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
            type="submit"
          >
            Get Started
          </button>
        )}

        <p className="text-sm text-coolGray-400 font-medium text-center">
          <span>Already have an account?</span>
          <Link className="text-green-500 hover:text-green-600" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
