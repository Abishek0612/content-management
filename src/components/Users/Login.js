/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import { loginAction } from "../../redux/slices/users/usersSlicess";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginAction({
        email: formData.email,
        password: formData.password,
      })
    );
    // console.log(formData)
    setFormData({
      email: "",
      password: "",
    });
  };

  //store data
  const { userAuth, loading, error, success } = useSelector(
    (state) => state?.users
  );
  // console.log(userAuth, loading, error, success )

  //! Redirect
  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile");
    }
  }, [navigate, userAuth?.userInfo?.token]);

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <a className="mb-36 inline-block" href="#"></a>
          <h2 className="mb-4 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">
            Login to your account
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Enter your details below.
          </p>
          {/* Display error */}
          {error && <ErrorMsg message={error?.message} />}

          {/* Display  success msg*/}
          {success && <SuccessMsg message="Login Success" />}

          <form onSubmit={handleSubmit}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-3"
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                type="submit"
              >
                Login Account
              </button>
            )}
          </form>
        </div>

        <p className="text-sm text-coolGray-400 font-medium text-center">
          <span>Don't have an account? </span>
          <Link className="text-green-500 hover:text-green-600" to="/login">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
