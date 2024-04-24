import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LogOut = () => {
  const navigate = useNavigate();
  try {
    axios
      .get("http://localhost:5005/logout")
      .then((result) => {
        console.log(result);
        toast.info("Logged out succesfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
