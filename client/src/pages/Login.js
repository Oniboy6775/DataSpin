import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Label, Spinner } from "flowbite-react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { BsEyeSlash } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/UserContext";
import logo from "../images/logo.jpg";
import LandingNav from "../components/LandingNav";
import FormInput from "../components/FormInput";
import styled from "styled-components";

export default function Login() {
  const { setupUser, handleChange, userName, password, isLoading } =
    useGlobalContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !userName) {
      toast.warning("All fields are required");
      return;
    }
    const currentUser = { password, userName };
    setupUser({ currentUser, endPoint: "login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        {/* Top Logo and Nav */}
        <div className="flex justify-between items-center mb-6">
          <Avatar img={logo} rounded size="lg" />
          <Button
            color="gray"
            pill
            onClick={() => navigate("/")}
            className="hover:bg-slate-200"
          >
            <FaHome className="text-xl" />
          </Button>
        </div>

        <LandingNav />

        {/* Header */}
        <h1 className="text-2xl font-extrabold text-center text-blue-600 mb-6">
          Welcome Back 👋🏽
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          <FormInput
            name="userName"
            value={userName}
            placeholder="Username / Email / Business Name"
            type="text"
            handleChange={handleInputChange}
            labelText="Username / Email / Business Name"
            icon={HiMail}
          />

          <FormInput
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            handleChange={handleInputChange}
            labelText="Password"
            icon={BsEyeSlash}
          />

          <Button
            type="submit"
            gradientDuoTone="cyanToBlue"
            className="font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" /> Please wait...
              </div>
            ) : (
              <>
                <FaUserAlt className="mr-2" /> Login
              </>
            )}
          </Button>
        </form>

        {/* Register & Forgot Password */}
        <div className="mt-6 text-center space-y-2">
          <Label>
            <span className="text-gray-600">New here?</span>{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </Label>

          <Button
            color="failure"
            pill
            size="xs"
            className="mt-2"
            onClick={() => navigate("/requestPasswordReset")}
          >
            Forgot Password?
          </Button>
        </div>
      </Card>

      {/* Side Section for Large Screens */}
      <div className="hidden md:flex flex-col justify-center items-center ml-10 text-white max-w-sm bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          We’re always here to serve you better 💙
        </h2>
        <p className="text-sm text-slate-200 text-center">
          Secure, fast and reliable login experience powered by DataSpin.
        </p>
      </div>
    </div>
  );
}

export const Container = styled.div`
  padding: 3rem 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: var(--primary-200);
`;
export const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  max-width: 400px;
  max-height: fit-content;
  padding: 1rem;
  width: 80%;
  background-color: var(--grey-200);
  border-radius: var(--borderRadius);
  position: relative;
  .logo {
    position: absolute;
    left: 1rem;
    border-radius: 100px;
  }
  .home__btn {
    position: absolute;
    right: 1rem;
  }
  .title {
    font-weight: 900;
    text-align: center;
    margin: 2rem auto 1rem;
  }
  .new__user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--primary-800);
    }
  }
  .register__btn {
    background-color: var(--red-dark);
    padding: 0.5rem;
  }
`;
