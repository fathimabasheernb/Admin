import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Flower2 } from "lucide-react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@roselle.com" && password === "admin123") {
      localStorage.setItem("roselleAdminLoggedIn", "true");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-decoration">
        <Flower2 size={35} />
        <h1>Roselle</h1>
        <p>Where every flower tells a story.</p>
      </div>

      <div className="login-container">

        <div className="login-card">

          <div className="login-icon">
            <Flower2 size={32} />
          </div>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to manage your Roselle store.
          </p>

          <form onSubmit={handleLogin}>

            <label>Email Address</label>

            <div className="login-input">
              <Mail size={19} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>

            <div className="login-input">
              <LockKeyhole size={19} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>

            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button">
              Sign In
            </button>

          </form>

          <p className="login-footer">
            © 2026 Roselle. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;