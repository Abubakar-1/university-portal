import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dialog,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ResponsiveContext } from "../../ResponsiveProvider";
import { UserContext } from "../../UserProvider";
import { Menus } from "../components/Menus";
import { CameraIcon } from "../components/Icons";
import Scanner from "../components/QrScanner";

export const StudentClasses = () => {
  axios.defaults.withCredentials = true;
  const { user, subjects } = useContext(UserContext);
  const { clicked, handleClicked } = useContext(ResponsiveContext);
  const { userDetails } = user || {};
  const navigate = useNavigate();
  const [attendanceRows, setAttendanceRows] = useState([]);
  const [registerForm, setRegisterForm] = useState(false);
  const [regSubId, setRegSubId] = useState();
  const [cameraClicked, setCameraClicked] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const handleScanAgain = () => {
    setScannedCode(null);
    setCameraClicked(true);
  };

  const handleScan = async (data) => {
    if (data) {
      setScannedCode(data);
      setCameraClicked(false);
      console.log(data);
      try {
        const response = await axios.post(
          "http://localhost:5005/mark-attendance",
          {
            classId: data,
            studentId: userDetails._id,
          }
        );
        console.log(response);
      } catch (error) {
        console.log("Error marking attendance", error);
        toast.error("Error marking attendance");
      }
    }
  };

  const registerSub = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:5005/register-subject?studentId=${userDetails._id}`,
          {
            subjectId: regSubId,
          }
        )
        .then((result) => {
          console.log(result);
          setRegisterForm(false);
          toast.success("Subject created successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    try {
      axios
        .get("http://localhost:5005/logout")
        .then((result) => {
          console.log(result);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendance = () => {
    if (userDetails && userDetails.subjects_registered_for) {
      const rows = userDetails.subjects_registered_for.reduce((acc, curr) => {
        return acc.concat(
          curr.attendance.map((entry, index) => ({
            sn: acc.length + index + 1,
            time: entry.class.time,
            date: new Date(entry.class.date).toLocaleDateString(),
            status: entry.status,
            class: entry.class._id, // Assuming class name is available
            subject: curr.subject.name,
          }))
        );
      }, []);
      setAttendanceRows(rows);
    }
  };

  const openRegisterSubject = () => {
    setRegisterForm(true);
  };

  useEffect(() => {
    getAttendance();
  }, [userDetails]);

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

            <Button onClick={logOut}>Logout</Button>

            <span className="md:hidden" onClick={handleClicked}>
              <IoMenu size={30} />
            </span>
          </div>
          <div>
            <div className="px-6">
              <h2 className="font-bold text-darkestPurple text-2xl">Classes</h2>
            </div>

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
                  onClick={openRegisterSubject}
                >
                  Register for a Subject
                </button>
              </div>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>

          <div className="p-10 text-2xl text-center flex items-center justify-center flex-col">
            <Card className="sm:w-[25%] p-10 flex items-center justify-center">
              <IconButton
                className="m-5"
                onClick={() => setCameraClicked((prev) => !prev)}
              >
                <CameraIcon />
              </IconButton>
              <div className="">Open Camera to mark Attendance</div>
            </Card>

            {scannedCode && (
              <div>
                <p>Scanned Code: {scannedCode}</p>
                <button onClick={handleScanAgain}>Scan Again</button>
              </div>
            )}

            {cameraClicked && (
              <div>
                <Scanner onScan={handleScan} />
                <button onClick={() => setCameraClicked(false)}>
                  Close Camera
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg grid grid-cols-12 m-5 my-10 p-5">
            <div className="flex justify-between col-span-12">
              <h2 className="font-bold text-darkestPurple text-2xl">
                {/* {selectedRole
                    ? `${selectedRole.charAt(0).toUpperCase()}${selectedRole.slice(1)}`
                    : "All Users"} */}
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
                            Subject Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Time
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Status
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Class ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceRows?.map((row, index) => {
                          return (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {row.subject}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {row.time}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {row.date}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <div className="w-max">
                                  <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={row.status}
                                    color={
                                      row.status === "present"
                                        ? "green"
                                        : "amber"
                                    }
                                  />
                                </div>
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {row.class}
                              </td>
                            </tr>
                          );
                        })}
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
        open={registerForm}
        handler={setRegisterForm}
        className="bg-transparent shadow-none"
      >
        <ToastContainer position="top-center" />

        <Card className="h-full w-full mt-14 flex items-center justify-center shadow-lg p-5">
          <Typography variant="h4" color="blue-gray">
            Create Class
          </Typography>

          <form className=" mb-2 w-full">
            <div className="flex items-center justify-center">
              <div className="mb-1 flex flex-col gap-3 w-full">
                <Typography className="-mb-2" variant="h6">
                  Subject
                </Typography>
                <Select
                  label="Subject"
                  value={regSubId}
                  onChange={(e) => setRegSubId(e)}
                  color="blue"
                >
                  {subjects?.map((sub, key) => (
                    <Option value={sub._id} key={key}>
                      {sub.name}
                    </Option>
                  ))}
                </Select>

                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    fullWidth
                    color="blue"
                    type="submit"
                    onClick={registerSub}
                  >
                    Register
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
