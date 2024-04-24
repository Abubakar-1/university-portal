import React, { useContext, useEffect, useState } from "react";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import { IoMenu } from "react-icons/io5";
import { Menus } from "../components/Menus";
import { ResponsiveContext } from "../components/ResponsiveProvider";
import { UserContext } from "../../UserProvider";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

export const Users = () => {
  const { handleClicked, clicked } = useContext(ResponsiveContext);
  const { mainUsers, Users } = useContext(UserContext);

  const [selectedRole, setSelectedRole] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const handleButtonClick = (role) => {
    setSelectedRole(role);
  };

  const openCreateUser = () => {
    setUserDialog(true);
  };

  const createUser = (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:5005/register", {
          role: userRole,
          email: userEmail,
          password: userPassword,
          name: userName,
          phone: userPhone,
        })
        .then((result) => {
          console.log(result);
          toast.success("User created successfully");
          setUserDialog(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Users();
  }, []);

  const filteredUsers = selectedRole
    ? mainUsers.filter((user) => user.role === selectedRole)
    : mainUsers;

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-12 h-[100vh]">
        {clicked && (
          <span className="delay-700">
            <ResponsiveMenuBar menus={Menus} />
          </span>
        )}
        <MenuBar menus={Menus} />
        <div className="bg-gray col-span-12 md:col-span-10 text-darkestPurple py-10">
          <div className="flex justify-between md:justify-end px-10 items-center pb-7 md:pb-0">
            <img
              src="src\assets\media\mypic.jpg"
              alt=""
              className="md:h-12 md:w-12 h-10 w-10 rounded-full"
            />
            <span className="md:hidden" onClick={handleClicked}>
              <IoMenu size={30} />
            </span>
          </div>
          <div>
            <div className="px-6">
              <h2 className="font-bold text-darkestPurple text-2xl">Users</h2>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-4 md:flex md:gap-0">
                <button
                  onClick={() => handleButtonClick("admin")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedRole === "admin" ? "normalPurple" : "white"} text-${selectedRole === "admin" && "white"} shadow-lg rounded-lg`}
                >
                  Administrators
                </button>
                <button
                  onClick={() => handleButtonClick("teacher")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedRole === "teacher" ? "normalPurple" : "white"} text-${selectedRole === "teacher" && "white"} shadow-lg rounded-lg`}
                >
                  Teachers
                </button>
                <button
                  onClick={() => handleButtonClick("student")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedRole === "student" ? "normalPurple" : "white"} text-${selectedRole === "student" && "white"} shadow-lg rounded-lg`}
                >
                  Students
                </button>
              </div>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>
          <h2 className="font-bold text-darkestPurple text-2xl p-5">
            {selectedRole
              ? `${selectedRole.charAt(0).toUpperCase()}${selectedRole.slice(1)}`
              : "All Users"}
          </h2>

          <div className="flex items-center justify-center">
            <div className="flex">
              <div className="px-5">
                <input
                  className="rounded-xl h-5 focus:outline-none p-5 sm:w-96 shadow-lg"
                  type="search"
                  placeholder="Search"
                />
              </div>
              <button
                className="bg-normalPurple text-white rounded-lg px-3 shadow-lg"
                onClick={openCreateUser}
              >
                Create a user
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-12 m-5 my-10 p-5">
            <div className="flex justify-between col-span-12">
              <h2 className="font-bold text-darkestPurple text-2xl">
                {selectedRole
                  ? `${selectedRole.charAt(0).toUpperCase()}${selectedRole.slice(1)}`
                  : "All Users"}
              </h2>
              <div className="text-red">Delete</div>
            </div>
            <div className="col-span-12">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                      <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Email
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Phone
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers?.map((user, index) => (
                          <tr
                            key={index}
                            className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {user.name}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              {user.email}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              {user.phone}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                              Green
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        size="xs"
        open={userDialog}
        handler={setUserDialog}
        className="bg-transparent shadow-none"
      >
        <ToastContainer position="top-center" />
        <Card className="h-full w-full mt-14 flex items-center justify-center shadow-lg p-5">
          <Typography variant="h4" color="deep-purple">
            Create User
          </Typography>

          <form className=" mb-2 w-full">
            <div className="flex items-center justify-center">
              <div className="mb-1 flex flex-col gap-3 w-full">
                <Typography className="-mb-2" variant="h6">
                  User
                </Typography>
                <Input
                  color="deep-purple"
                  label="User Name"
                  size="lg"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Role
                </Typography>
                <Select
                  label="Role"
                  value={userRole}
                  onChange={(e) => setUserRole(e)}
                  color="deep-purple"
                >
                  <Option value={"admin"}>Admin</Option>
                  <Option value={"teacher"}>Teacher</Option>
                </Select>

                <Typography className="-mb-2" variant="h6">
                  Email
                </Typography>
                <Input
                  color="deep-purple"
                  label="Email"
                  size="lg"
                  onChange={(e) => setUserEmail(e.target.value)}
                />

                <Typography className="-mb-2" variant="h6">
                  Phone
                </Typography>
                <Input
                  color="deep-purple"
                  label="Phone"
                  size="lg"
                  onChange={(e) => setUserPhone(e.target.value)}
                />

                <Typography className="-mb-2" variant="h6">
                  Password
                </Typography>
                <Input
                  color="deep-purple"
                  label="Password"
                  size="lg"
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                />

                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    fullWidth
                    color="deep-purple"
                    type="submit"
                    onClick={createUser}
                  >
                    Create
                  </Button>
                </CardFooter>
              </div>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};
