import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../UserProvider";

export const Index = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, fetchUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:5005/login", {
          email,
          password,
        })
        .then(async (result) => {
          console.log(result);
          const roles = result.data.user.role;
          console.log(roles);

          roles === "admin" && navigate(`/admin`);
          roles === "teacher" && navigate(`/teacher`);
          roles === "student" && navigate(`/student`);
        })
        .catch((error) => {
          toast.error(error.response.data);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl text-center text-lightPurple">
          Login | Student Portal
        </h2>
        <Card className="mt-6 w-96 p-10">
          <form onSubmit={handleLogin} className="grid place-items-center">
            <div className="flex w-72 flex-col gap-6 text-darkestPurple">
              <Input
                type="email"
                color="deep-purple"
                label="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                color="deep-purple"
                label="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" color="deep-purple">
                Login
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};
