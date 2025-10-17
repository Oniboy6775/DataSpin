import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { FaHome, FaUserAlt } from "react-icons/fa";
import FormInput from "../components/FormInput";
import { useGlobalContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { Avatar, Button, Card, Label } from "flowbite-react";
import { BsEyeSlash, BsPerson } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import LandingNav from "../components/LandingNav";

function Register() {
  const {
    setupUser,
    email,
    handleChange,
    phoneNumber,
    password,
    userName,
    passwordCheck,
    isLoading,
  } = useGlobalContext();

  const { referralId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Enter your email");
      return;
    }

    let currentUser = { userName, password, email, phoneNumber, passwordCheck };
    if (referralId) currentUser.referredBy = referralId;

    setupUser({ currentUser, endPoint: "register" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[var(--primary-100)] pt-[4rem]">
      {/* Form Section */}
      <Card className="border w-11/12 md:w-1/2 max-w-[450px] border-[var(--primary-300)] bg-white shadow-md rounded-2xl p-6">
        <LandingNav />

        <div className="flex justify-between items-center mb-6">
          <Avatar img={logo} rounded bordered />
          <Button
            disabled={isLoading}
            onClick={() => navigate("/")}
            className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white"
          >
            <FaHome />
          </Button>
        </div>

        <h1 className="text-center text-2xl font-bold text-[var(--primary-700)] mb-4 capitalize">
          Register
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput
            name="userName"
            value={userName}
            placeholder="Username / Business Name"
            handleChange={handleInputChange}
            type="text"
            labelText="Username / Business Name"
            icon={BsPerson}
          />

          <FormInput
            value={email}
            name="email"
            placeholder="Email"
            handleChange={handleInputChange}
            type="email"
            icon={HiMail}
          />

          <FormInput
            value={phoneNumber}
            name="phoneNumber"
            placeholder="Phone Number"
            handleChange={handleInputChange}
            type="number"
            labelText="Phone Number"
            icon={BiPhoneCall}
          />

          <FormInput
            value={password}
            name="password"
            placeholder="Password"
            handleChange={handleInputChange}
            type="password"
            icon={BsEyeSlash}
          />

          <FormInput
            value={passwordCheck}
            name="passwordCheck"
            placeholder="Re-enter Password"
            type="password"
            handleChange={handleInputChange}
            icon={BsEyeSlash}
          />

          {/* Centered Register Button */}
          <div className="flex justify-center mt-2">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white font-semibold px-8 py-2 rounded-lg shadow-md transition-all duration-300"
              isProcessing={isLoading}
            >
              <FaUserAlt className="mr-2 h-5 w-5" />
              Register
            </Button>
          </div>

          <div className="text-center mt-3">
            <Label htmlFor="agree" className="flex justify-center text-sm">
              <span>Already have an account?&nbsp;</span>
              <Link
                className="text-[var(--primary-600)] hover:underline capitalize"
                to="/login"
              >
                Login to my account
              </Link>
            </Label>
          </div>
        </form>
      </Card>

      {/* Right Side Banner */}
      <Card className="hidden md:flex w-1/2 h-full items-center justify-center bg-[var(--primary-700)] text-white rounded-none md:rounded-l-[50px] shadow-lg p-10">
        <h2 className="text-2xl font-semibold leading-snug text-center">
          We are always here to serve you better.
          <br />
          <span className="italic font-light">Reach out to us now.</span>
        </h2>
      </Card>
    </div>
  );
}

export default Register;
