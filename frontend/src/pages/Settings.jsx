// src/pages/Settings.jsx

import React, { useState } from "react";

import { motion } from "framer-motion";

import {
  FiUser,
  FiMoon,
  FiBell,
  FiLock,
  FiVolume2,
  FiGlobe,
  FiSave,
} from "react-icons/fi";

import "./Settings.css";

const Settings = () => {
  // =========================================
  // STATES
  // =========================================

  const [settings, setSettings] = useState({
    username: "Vaishnavi",

    email: "vaishnavi@gmail.com",

    darkMode: true,

    notifications: true,

    sound: true,

    privacy: false,

    language: "English",
  });

  // =========================================
  // TOGGLE
  // =========================================

  const toggleSetting = (key) => {
    setSettings({
      ...settings,

      [key]: !settings[key],
    });
  };

  return (
    <div className="settings-page">
      {/* =====================================
          GLOWS
      ===================================== */}

      <div className="settings-glow glow-left" />

      <div className="settings-glow glow-right" />

      {/* =====================================
          HERO
      ===================================== */}

      <section className="settings-hero">
        <div className="container-premium">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="settings-header"
          >
            <span className="settings-badge">⚙️ ACCOUNT SETTINGS</span>

            <h1>
              Personalize Your
              <span className="gradient-text"> Experience</span>
            </h1>

            <p>
              Customize your premium quiz dashboard, manage notifications and
              control your profile preferences.
            </p>
          </motion.div>

          {/* =====================================
              SETTINGS CARD
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="settings-card glass-card"
          >
            {/* PROFILE */}

            <div className="settings-section">
              <div className="settings-section-title">
                <FiUser />
                Profile Settings
              </div>

              <div className="settings-input-group">
                <label>Username</label>

                <input
                  type="text"
                  value={settings.username}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      username: e.target.value,
                    })
                  }
                />
              </div>

              <div className="settings-input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* PREFERENCES */}

            <div className="settings-section">
              <div className="settings-section-title">
                <FiMoon />
                Preferences
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>Dark Mode</h3>

                  <p>Enable premium dark interface</p>
                </div>

                <button
                  onClick={() => toggleSetting("darkMode")}
                  className={`toggle-btn ${settings.darkMode ? "active" : ""}`}
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>Notifications</h3>

                  <p>Receive quiz updates and rewards</p>
                </div>

                <button
                  onClick={() => toggleSetting("notifications")}
                  className={`toggle-btn ${
                    settings.notifications ? "active" : ""
                  }`}
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>Sound Effects</h3>

                  <p>Quiz sounds and interactions</p>
                </div>

                <button
                  onClick={() => toggleSetting("sound")}
                  className={`toggle-btn ${settings.sound ? "active" : ""}`}
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>Private Profile</h3>

                  <p>Hide profile from public rankings</p>
                </div>

                <button
                  onClick={() => toggleSetting("privacy")}
                  className={`toggle-btn ${settings.privacy ? "active" : ""}`}
                >
                  <span />
                </button>
              </div>
            </div>

            {/* EXTRA */}

            <div className="settings-section">
              <div className="settings-section-title">
                <FiGlobe />
                Regional Settings
              </div>

              <div className="settings-input-group">
                <label>Language</label>

                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      language: e.target.value,
                    })
                  }
                >
                  <option>English</option>

                  <option>Hindi</option>

                  <option>Telugu</option>

                  <option>Spanish</option>
                </select>
              </div>
            </div>

            {/* SECURITY */}

            <div className="settings-section">
              <div className="settings-section-title">
                <FiLock />
                Security
              </div>

              <button className="settings-security-btn">Change Password</button>

              <button className="settings-security-btn">
                Enable 2FA Authentication
              </button>
            </div>

            {/* SAVE */}

            <button className="settings-save-btn">
              <FiSave />
              Save Changes
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
