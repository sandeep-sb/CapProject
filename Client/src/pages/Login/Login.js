import React, { useState } from "react";
// import "./Login.css";
import axios from "axios";

import { useHref, useNavigate } from "react-router-dom";
import login from "../../img/login.PNG";
import signup from "../../img/signup.png";
import config from "../../config";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

export default function Login() {
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // handle inputs
  let name, value;
  const handleRegisterInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setSignUp({ ...signUp, [name]: value });
  };

  const handleLoginInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setLoginUser({ ...loginUser, [name]: value });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      const username = values.username;
      const email = values.email;
      const password = values.password;

      const res = fetch(config.apiRegisterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      alert(`${username} registered`);
      
    },

    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, "Username is too short")
        .max(10, "Username is too long")
        .required("Username cannot be left blank"),
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Email cannot be left blank"),
      password: yup
        .string()
        .required("Password cannot be left blank")

        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

      confirmPassword: yup
        .string()
        .required("Confirm Password cannot be left blank")
        .test(
          "confirmPassword",
          "Password & confirm password should be same",
          function (confirmpass) {
            if (this.parent.password === confirmpass) {
              return true;
            }
            return false;
          }
        ),
    }),
  });

  // connecting to backend
  const RegisterData = async (e) => {
    const { username, email, password } = signUp;

    const res = await fetch(config.apiRegisterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.status === 409) {
      window.alert("User already exists");
    } else if (data.status === 200) {
      window.alert("User registered successfully");
    
    } else {
      window.alert("Registration failed");
    }
  };

  const UserLogin = async (e) => {
    const { email, password } = loginUser;

    const res = await fetch(config.apiLoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const loginData = await res.json();
    console.log(loginData);

    if (loginData.status === 200) {
      window.alert("logged in successfully");
      onClick = { signInButton };
    } else if (loginData.status === 401) {
      window.alert(
        "You are not authorized. Please check your email and password."
      );
    }
  };

  const signUpButton = () => {
    document.getElementById("container").classList.add("sign-up-mode");

    document.getElementById("signin").classList.add("signin-signup2");
    document.getElementById("signin").classList.remove("signin-signup");

    document.getElementById("panel").classList.remove("right-panel2");
  };

  const signInButton = () => {
    document.getElementById("container").classList.remove("sign-up-mode");

    document.getElementById("signin").classList.remove("signin-signup2");
    document.getElementById("signin").classList.add("signin-signup");

    document.getElementById("panel").classList.add("right-panel2");
  };

  const difftoast = (responseMsg) => {
    let popUpText =
      responseMsg === "already exist"
        ? "Email id already exist"
        : "Registration Successfull";
    toast.success(popUpText, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container" id="container">
      <div className="forms-container">
        {/* LOGIN FORM */}

        <div className="signin-signup" id="signin">
          <form method="POST" className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                key="email"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={loginUser.email}
                onChange={handleLoginInputs}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                id="password"
                key="password"
                name="password"
                type="password"
                placeholder="Password"
                value={loginUser.password}
                onChange={handleLoginInputs}
              />
            </div>
            <button type="button" className="btn solid" onClick={UserLogin}>
              Login
            </button>
            <p className="social-text">Or Sign in with social Platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>

        {/* SIGN UP FORM */}

        <div className="signup-signup" id="signup">
          <form
            method="post"
            className="sign-up-form"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                key="username"
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Username"
                //value={signUp.username}
                //onChange={handleRegisterInputs}
              />
            </div>
            {formik.errors.username && formik.touched.username ? (
              <div
                className="warning"
                style={{ color: "red", fontSize: "12px" }}
              >
                {formik.errors.username}
              </div>
            ) : null}

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                key="email"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Email"
                //value={signUp.email}
                //onChange={handleRegisterInputs}
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="warning"
                style={{ color: "red", fontSize: "12px" }}
              >
                {formik.errors.email}
              </div>
            ) : null}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                key="password"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                //value={signUp.password}
                //onChange={handleRegisterInputs}
              />
            </div>
            {formik.errors.password && formik.touched.password ? (
              <div
                className="warning"
                style={{ color: "red", width: "300px", fontSize: "12px" }}
              >
                {formik.errors.password}
              </div>
            ) : null}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                key="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Confirm Password"
                //value={signUp.confirmPassword}
                //onChange={handleRegisterInputs}
              />
            </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div
                className="warning"
                style={{ color: "red", fontSize: "12px" }}
              >
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn solid" /* onClick={RegisterData} */
            >
              Register
            </button>
            <p className="social-text">Or Sign Up with social Platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New Here?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. vero sit
              blanditiis? Maiores reiciendis, ea repudiandae delectus, dolorum
              qui aspernatur odit perferendis doloribus corporis laboriosam
              mollitia suscipit quia inventore quidem!
            </p>
            <button
              className="btn transparent"
              id="sign-up-button"
              onClick={signUpButton}
            >
              Sign Up
            </button>
          </div>
          <img src={login} className="image" />
        </div>

        <div className="panel right-panel" id="panel">
          <div className="content">
            <h3>One of Us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. vero sit
              blanditiis? Maiores reiciendis, ea repudiandae delectus, dolorum
              qui aspernatur odit perferendis doloribus corporis laboriosam
              mollitia suscipit quia inventore quidem!
            </p>
            <button
              className="btn transparent"
              id="sign-in-button"
              onClick={signInButton}
            >
              Sign In
            </button>
          </div>
          <img src={signup} className="image" />
        </div>
      </div>
    </div>
  );
}
