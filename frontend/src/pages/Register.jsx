// src/pages/Register.jsx

import React, { useState } from "react";

import { motion } from "framer-motion";

import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "Vaishnavi",

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
    <div className="register-page">
      {/* ====================================
          GLOW EFFECTS
      ==================================== */}

      <div className="register-glow glow-left" />

      <div className="register-glow glow-right" />

      {/* ====================================
          MAIN CONTAINER
      ==================================== */}

      <div className="register-wrapper">
        {/* LEFT PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="register-left"
        >
          <div className="register-badge">PREMIUM QUIZ PLATFORM</div>

          <h1>
            Create Your
            <span className="gradient-text"> QuizVerse</span> Account
          </h1>

          <p>
            Join thousands of players, unlock achievements, compete globally and
            experience premium quiz battles.
          </p>

          <div className="register-features">
            <div className="feature-item">🏆 Global Leaderboards</div>

            <div className="feature-item">⚡ AI Powered Quizzes</div>

            <div className="feature-item">🎯 Daily Challenges</div>

            <div className="feature-item">🚀 Multiplayer Battles</div>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="register-card glass-card"
        >
          <div className="register-card-top">
            <h2>Create Account</h2>

            <p>Start your premium quiz journey today.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <FiUser />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label>Email Address</label>

              <div className="input-wrapper">
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
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
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
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button type="submit" className="register-btn">
              Create Account
              <FiArrowRight />
            </button>
          </form>

          {/* FOOTER */}
          <div className="register-footer">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
