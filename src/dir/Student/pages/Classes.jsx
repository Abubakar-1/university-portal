import React, { useContext, useState } from "react";
import { UserContext } from "../../UserProvider";
import { ResponsiveContext } from "../../ResponsiveProvider";
import { Menus } from "../components/Menus";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import { ToastContainer, toast } from "react-toastify";
import { IoMenu } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import QRCode from "qrcode.react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Classes = () => {
  axios.defaults.withCredentials = true;
  const { user, teachersClas } = useContext(UserContext);
  const { clicked, handleClicked } = useContext(ResponsiveContext);
  const { userDetails } = user || {};
  const [showQr, setShowQr] = useState(false);
  const [finalQrData, setfinalQrData] = useState();
  const [specificCls, setSpecificCls] = useState();
  const [showAttendance, setShowAttendance] = useState(false);
  const [openClassForm, setOpenClassForm] = useState(false);
  const [classDate, setClassDate] = useState();
  const [classTime, setClassTime] = useState();
  const [classSubject, setClassSubject] = useState();
  const navigate = useNavigate();

  const generateQrCode = (classId) => {
    console.log("generating");
    const qrData = classId;
    setfinalQrData(qrData);
    setShowQr(true);
  };

  const openCreateClass = () => {
    setOpenClassForm(true);
  };

  const createClass = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5005/create-class", {
          subjectId: classSubject,
          teacherId: userDetails._id,
          date: classDate,
          time: classTime,
        })
        .then((result) => {
          console.log(result);
          setOpenClassForm(false);
          toast.success("Class created successfully");
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

  const viewAttendance = async (classId) => {
    try {
      await axios
        .get(`http://localhost:5005/specific-class?classId=${classId}`)
        .then((result) => {
          console.log(result.data);
          setSpecificCls(result.data);
          setShowAttendance(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("s", specificCls);

  const { subjects } = userDetails || {};

  console.log(user, teachersClas);
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
          </div>

          <div className="border border-darkestgray m-5"></div>

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
                onClick={openCreateClass}
              >
                Create a Class
              </button>
            </div>
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
                            Subject Code
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Time
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Generate
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Attendance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachersClas?.map((cls, index) => {
                          return (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {cls.subject.code}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {new Date(cls.date).toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {cls.time}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <Button
                                  color="deep-purple"
                                  onClick={() => generateQrCode(cls._id)}
                                >
                                  Generate QR
                                </Button>
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <Button
                                  color="deep-purple"
                                  onClick={() => viewAttendance(cls._id)}
                                >
                                  View Attendance
                                </Button>
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
        open={showQr}
        handler={setShowQr}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-center">
              QR Code for Class ID: {finalQrData}{" "}
            </h2>
            <div className="flex items-center justify-center">
              <QRCode value={finalQrData} />
            </div>
          </CardBody>
        </Card>
      </Dialog>

      <Dialog
        size="xl"
        open={showAttendance}
        handler={setShowAttendance}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[100vw]">
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-center">Attendance</h2>
            <div className="flex items-center justify-center">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                    <tr>
                      <th scope="col" className=" px-6 py-4">
                        Student Name
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Subject Code
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Date
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Time
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Class ID
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specificCls?.map((cls) =>
                      cls.attendance.map((att, attIndex) => (
                        <tr
                          key={attIndex}
                          className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {att.student.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {cls.subject.code}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                            {new Date(cls.date).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                            {cls.time}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                            {cls._id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={att.status}
                                color={
                                  att.status === "present" ? "green" : "amber"
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>

      <Dialog
        size="xs"
        open={openClassForm}
        handler={setOpenClassForm}
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
                  Time
                </Typography>
                <Input
                  color="deep-purple"
                  label="Time"
                  size="lg"
                  type="time"
                  onChange={(e) => setClassTime(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Date
                </Typography>
                <Input
                  color="deep-purple"
                  label="Date"
                  size="lg"
                  type="date"
                  onChange={(e) => setClassDate(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  Subject
                </Typography>
                <Select
                  label="Subject"
                  value={classSubject}
                  onChange={(e) => setClassSubject(e)}
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
                    onClick={createClass}
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
