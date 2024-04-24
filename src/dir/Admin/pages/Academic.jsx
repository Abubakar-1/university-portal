import React, { useContext, useEffect, useState } from "react";
import { MenuBar } from "../components/MenuBar";
import { Menus } from "../components/Menus";
import { ResponsiveContext } from "../components/ResponsiveProvider";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "../../UserProvider";
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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const Academic = () => {
  axios.defaults.withCredentials = true;
  const { handleClicked, clicked } = useContext(ResponsiveContext);
  const [selectedOption, setSelectedOption] = useState("courses");
  const [viewAtt, setViewAtt] = useState(false);
  const [attData, setAttData] = useState();
  const [courseName, setCourseName] = useState();
  const [teacherId, setTeacherId] = useState();
  const [courseCode, setCourseCode] = useState();
  const [courseDesc, setCourseDesc] = useState();
  const [subjectDialog, setSubjectDialog] = useState(false);

  const { results, classes, subjects, runExtra, teachers } =
    useContext(UserContext);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const viewAttendance = (attendance) => {
    console.log(attendance);
    setViewAtt(true);
    setAttData(attendance);
  };

  const openCreateSubject = () => {
    setSubjectDialog(true);
  };

  console.log("teachers", teachers);

  const createCourse = (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:5005/create-subject", {
          name: courseName,
          code: courseCode,
          teacher: teacherId,
          description: courseDesc,
        })
        .then((result) => {
          console.log(result);
          toast.success("Subject created successfully");
          setSubjectDialog(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    runExtra();
  }, []);
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
        <div className="bg-gray  col-span-12 md:col-span-10 py-10 px-6">
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
              <h2 className="font-bold text-darkestPurple text-2xl">
                Academic
              </h2>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-4 md:flex md:gap-0">
                <button
                  onClick={() => handleButtonClick("courses")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedOption === "courses" ? "normalPurple" : "white"} text-${selectedOption === "courses" && "white"} shadow-lg rounded-lg`}
                >
                  Courses
                </button>
                <button
                  onClick={() => handleButtonClick("grades")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedOption === "grades" ? "normalPurple" : "white"} text-${selectedOption === "grades" && "white"} shadow-lg rounded-lg`}
                >
                  Grades
                </button>
                <button
                  onClick={() => handleButtonClick("classes")}
                  className={`hover:bg-normalPurple hover:text-white py-3 px-5 mx-4 text-center bg-${selectedOption === "classes" ? "normalPurple" : "white"} text-${selectedOption === "classes" && "white"} shadow-lg rounded-lg`}
                >
                  Classes
                </button>
              </div>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>
          <h2 className="font-bold text-darkestPurple text-2xl p-5">
            {selectedOption
              ? `${selectedOption.charAt(0).toUpperCase()}${selectedOption.slice(1)}`
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
                onClick={openCreateSubject}
              >
                Add new Courses
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg grid grid-cols-12 m-5 my-10 p-5">
            <div className="flex justify-between col-span-12">
              <h2 className="font-bold text-darkestPurple text-2xl">
                {selectedOption
                  ? `${selectedOption.charAt(0).toUpperCase()}${selectedOption.slice(1)}`
                  : "All Users"}
              </h2>
              <div className="text-red">Delete</div>
            </div>
            <div className="col-span-12">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    {selectedOption === "courses" && (
                      <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                        <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                          <tr>
                            <th scope="col" className=" px-6 py-4">
                              Course Name
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Course Code
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Teacher
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects?.map((subject, index) => (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {subject.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {subject.code}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {subject.teacher.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {subject.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {selectedOption === "grades" && (
                      <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                        <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                          <tr>
                            <th scope="col" className=" px-6 py-4">
                              Student Name
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Subject Name
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Teacher Name
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Grade
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Score
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Remark
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.map((result, index) => (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {result.student.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {result.subject.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {result.teacher.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {result.grade}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {result.score}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {result.remark}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {selectedOption === "classes" && (
                      <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                        <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                          <tr>
                            <th scope="col" className=" px-6 py-4">
                              Class ID
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Teacher
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Subject
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Date
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Time
                            </th>
                            <th scope="col" className=" px-6 py-4">
                              Attendance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {classes?.map((classs, index) => (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {classs._id}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {classs.subject.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {classs.teacher.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {classs.date}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {classs.time}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <Button
                                  color="deep-purple"
                                  onClick={() =>
                                    viewAttendance(classs.attendance)
                                  }
                                >
                                  View Attendance
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Dialog
              size="xs"
              open={viewAtt}
              handler={setViewAtt}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full w-max[24rem]">
                <CardBody className="flex flex-col gap-4">
                  <h2 className="text-center">Attendance </h2>
                  <div className="flex items-center justify-center">
                    <table className="min-w-full text-center text-sm font-light text-surface text-darkestPurple">
                      <thead className="border-b border-neutral-200 bg-neutral-50 text-lg dark:border-white/10">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            Student Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attData?.map((att, index) => (
                          <tr
                            key={index}
                            className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {att.student.name}
                            </td>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Dialog>
          </div>

          <Dialog
            size="xs"
            open={subjectDialog}
            handler={setSubjectDialog}
            className="bg-transparent shadow-none"
          >
            <ToastContainer position="top-center" />
            <Card className="h-full w-full mt-14 flex items-center justify-center shadow-lg p-5">
              <Typography variant="h4" color="blue-gray">
                Create Subject
              </Typography>

              <form className=" mb-2 w-full">
                <div className="flex items-center justify-center">
                  <div className="mb-1 flex flex-col gap-3 w-full">
                    <Typography className="-mb-2" variant="h6">
                      Subject
                    </Typography>
                    <Input
                      color="blue"
                      label="Course Name"
                      size="lg"
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    <Typography className="-mb-2" variant="h6">
                      Teacher
                    </Typography>
                    <Select
                      label="Teacher"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e)}
                      color="blue"
                    >
                      {teachers?.map((teacher, key) => (
                        <Option value={teacher._id} key={key}>
                          {teacher.name}
                        </Option>
                      ))}
                    </Select>

                    <Input
                      color="blue"
                      label="Course Code"
                      size="lg"
                      onChange={(e) => setCourseCode(e.target.value)}
                    />

                    <Input
                      color="blue"
                      label="Course Description"
                      size="lg"
                      onChange={(e) => setCourseDesc(e.target.value)}
                    />

                    <CardFooter className="pt-0">
                      <Button
                        variant="gradient"
                        fullWidth
                        color="blue"
                        type="submit"
                        onClick={createCourse}
                      >
                        Create
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </form>
            </Card>
          </Dialog>
        </div>
      </div>
    </>
  );
};
