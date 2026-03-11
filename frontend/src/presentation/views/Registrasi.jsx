import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Toast } from "primereact/toast";
import SecureStorage from "@/helpers/SecureStorage";
import "../../index.css";
const AuthPages = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nama: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            nama: formData.nama,
          };

      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        payload,
      );

      // Simpan token jika ada
      if (response.data.accessToken) {
        SecureStorage.setStorage("token", response.data.accessToken);
      }

      // Simpan user data ke SecureStorage
      if (response.data.user) {
        SecureStorage.setStorage("user", response.data.user);
      }

      navigate("/app/dashboard");
    } catch (error) {
      // console.error(
      //   "Auth error:",
      //   error.response?.data?.message || error.message,
      // );
      const msg = error.response?.data?.message || "Login gagal";
      // sementara
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: msg,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Slide data
  const slides = [
    {
      title: "Edit Smarter. Export Faster.",
      subtitle: "Create Anywhere.",
      description:
        "From quick social media clips to full-length videos, our powerful editor lets you work seamlessly across devices.",
    },
    {
      title: "Collaborate in Real-Time",
      subtitle: "Team Up Effortlessly",
      description:
        "Work together with your team on video projects with real-time collaboration and feedback tools.",
    },
    {
      title: "AI-Powered Editing",
      subtitle: "Smart & Efficient",
      description:
        "Leverage AI tools to automatically edit, enhance, and optimize your videos for any platform.",
    },
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="auth-container bg-[url('../../../public/layout/background/d.jpg')] bg-cover bg-center">
      {/* Left Section - Full Screen Background & Slider */}
      <Toast ref={toast} />
      <div className="left-section">
        <div className="left-content">
          <div className="geometric-bg">
            <div className="geometric-shape shape1"></div>
            <div className="geometric-shape shape2"></div>
            <div className="geometric-shape shape3"></div>
            <div className="geometric-shape shape4"></div>
          </div>

          <div className="logo-section">
            <a href="" onClick={() => navigate("/")} className="back-link">
              ← Back to Website
            </a>
            <div className="logo">
              <div className="logo-icon">🛜</div>
              <div className="logo-text">FIBERIX</div>
            </div>
          </div>

          <div className="slider-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${
                  index === currentSlide
                    ? "active"
                    : index < currentSlide
                      ? "inactive-left"
                      : "inactive-right"
                }`}
              >
                <h1 className="tagline">{slide.title}</h1>
                <h2 className="subtitle">{slide.subtitle}</h2>
                <p className="description">{slide.description}</p>
              </div>
            ))}
          </div>

          <div className="progress-indicator">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        {/* Right Section - Card Form */}
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="form-subtitle">
              {isLogin
                ? "Log in to start creating stunning videos with ease."
                : "Sign up to start your creative journey with us."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Input your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <label className="input-label">Name</label>
                <input
                  type="text"
                  name="nama"
                  className="input-field"
                  placeholder="Input your name"
                  value={formData.nama}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input-field"
                  placeholder={
                    isLogin ? "Input your password" : "Create a password"
                  }
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="input-field"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <>
                <div className="checkbox-group">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="remember"
                      name="rememberMe"
                      className="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="remember" className="checkbox-label">
                      Remember Me
                    </label>
                  </div>
                  <a href="#" className="forgot-link">
                    Forgot Password?
                  </a>
                </div>
              </>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <div className="divider">Or continue with</div>

            <button type="button" className="google-button">
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="form-footer">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                      setIsLogin(false);
                    }}
                  >
                    Sign up here
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                      setIsLogin(true);
                    }}
                  >
                    Log in here
                  </a>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
