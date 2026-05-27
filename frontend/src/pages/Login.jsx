// src/pages/Login.jsx

import React, { useState } from "react";

import { motion } from "framer-motion";

import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "vaishnavi@gmail.com",

    password: "vaishnavi123",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* ====================================
          GLOW EFFECTS
      ==================================== */}

      <div className="login-glow glow-left" />

      <div className="login-glow glow-right" />

      {/* ====================================
          WRAPPER
      ==================================== */}

      <div className="login-wrapper">
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="login-left"
        >
          <div className="login-badge">QUIZVERSE PREMIUM</div>

          <h1>
            Welcome Back To
            <span className="gradient-text"> QuizVerse</span>
          </h1>

          <p>
            Continue your premium quiz journey, challenge global players, unlock
            achievements and dominate the leaderboard.
          </p>

          <div className="login-features">
            <div className="login-feature">🏆 Global Rankings</div>

            <div className="login-feature">⚡ Live Quiz Battles</div>

            <div className="login-feature">🎯 AI Challenges</div>

            <div className="login-feature">🚀 Daily Rewards</div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="login-card glass-card"
        >
          <div className="login-card-top">
            <h2>Login</h2>

            <p>Access your premium QuizVerse account.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="login-input-group">
              <label>Email Address</label>

              <div className="login-input-wrapper">
                <FiMail />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-input-group">
              <label>Password</label>

              <div className="login-input-wrapper">
                <FiLock />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {/* BUTTON */}
            <button type="submit" className="login-btn">
              Login
              <FiArrowRight />
            </button>
          </form>

          {/* FOOTER */}
          <div className="login-footer">
            Don’t have an account?
            <Link to="/register">Register</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
