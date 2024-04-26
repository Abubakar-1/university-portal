import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MenuBar, ResponsiveMenuBar } from "../components/MenuBar";
import { Menus } from "../components/Menus";
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
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import { ResponsiveContext } from "../../ResponsiveProvider";
import axios from "axios";

export const Results = () => {
  axios.defaults.withCredentials = true;
  const { user, teachersClas } = useContext(UserContext);
  const { clicked, handleClicked } = useContext(ResponsiveContext);
  const { userDetails } = user || {};
  const navigate = useNavigate();
  const [openResultViewer, setOpenResultViewer] = useState(false);
  const [subjectResult, setSubjectResult] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [score, setScore] = useState("");
  const [studentId, setStudentId] = useState("");
  const [resultForm, setResultForm] = useState(false);

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

  const viewSubjectResult = async (id) => {
    try {
      await axios
        .get(`http://localhost:5005/results-per-subject?subjectId=${id}`)
        .then((result) => {
          console.log("result", result);
          setSubjectResult(result.data);
          setOpenResultViewer(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const openResultForm = async (id) => {
    await viewSubjectResult(id);
    setResultForm(true);
    setSubjectId(id);
  };

  const createResult = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5005/create-result", {
          subject: subjectId,
          student: studentId,
          score: score,
          teacher: userDetails._id,
        })
        .then((result) => {
          console.log("result", result);
          toast.success("Result added successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {}
  };
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
              <h2 className="font-bold text-darkestPurple text-2xl">Results</h2>
            </div>
          </div>

          <div className="border border-darkestgray m-5"></div>

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
                            Name
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            View
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            Add
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userDetails?.subjects.map((sub, index) => {
                          return (
                            <tr
                              key={index}
                              className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                            >
                              <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                {sub.code}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                {sub.name}
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <Button
                                  color="deep-purple"
                                  onClick={() => viewSubjectResult(sub._id)}
                                >
                                  View Results
                                </Button>
                              </td>
                              <td className="whitespace-nowrap  px-6 py-4 text-darkestPurple font-medium">
                                <Button
                                  color="deep-purple"
                                  onClick={() => openResultForm(sub._id)}
                                >
                                  Add result
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
        size="xl"
        open={openResultViewer}
        handler={setOpenResultViewer}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[100vw]">
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-center">Student Results</h2>
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
                        Score
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Grade
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectResult?.map((studResult, index) => (
                      <tr
                        key={index}
                        className="hover:bg-lightPurple cursor-pointer border-b border-neutral-200 dark:border-white/10"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {studResult.student.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {studResult.subject.code}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                          {studResult.score}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                          {studResult.grade}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                          <td className="whitespace-nowrap px-6 py-4 text-darkestPurple font-medium">
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={studResult.remark}
                                color={
                                  studResult.remark === "Excellent"
                                    ? "green"
                                    : studResult.remark === "Good"
                                      ? "teal"
                                      : studResult.remark === "Average"
                                        ? "cyan"
                                        : studResult.remark === "Below Aberage"
                                          ? "purple"
                                          : "amber"
                                }
                              />
                            </div>
                          </td>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>

      <Dialog
        size="xs"
        open={resultForm}
        handler={setResultForm}
        className="bg-transparent shadow-none"
      >
        <ToastContainer position="top-center" />
        <Card className="h-full w-full mt-14 flex items-center justify-center shadow-lg p-5">
          <Typography variant="h4" color="blue-gray">
            Add Student Result
          </Typography>

          <form className=" mb-2 w-full">
            <div className="flex items-center justify-center">
              <div className="mb-1 flex flex-col gap-3 w-full">
                <Typography className="-mb-2" variant="h6">
                  Score
                </Typography>
                <Input
                  color="deep-purple"
                  label="Score"
                  size="lg"
                  type="number"
                  onChange={(e) => setScore(e.target.value)}
                />

                <Typography className="-mb-2" variant="h6">
                  Student
                </Typography>
                <Select
                  label="Subject"
                  value={studentId}
                  onChange={(e) => setStudentId(e)}
                  color="blue"
                >
                  {subjectResult?.map((sub, key) => (
                    <Option value={sub.student._id} key={key}>
                      {sub.student.name}
                    </Option>
                  ))}
                </Select>

                <CardFooter className="pt-0">
                  <Button
                    variant="gradient"
                    fullWidth
                    color="blue"
                    type="submit"
                    onClick={createResult}
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
