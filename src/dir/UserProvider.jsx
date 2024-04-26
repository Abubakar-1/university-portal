import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState();
  const [mainUsers, setMainUsers] = useState([]);
  const [subjects, setSubjects] = useState();
  const [students, setStudents] = useState();
  const [teachers, setTeachers] = useState();
  const [results, setResults] = useState();
  const [classes, setClasses] = useState();
  const [rolePro, setRolePro] = useState("");
  const [teachersClas, setTeachersClass] = useState();
  const [studResult, setStudResult] = useState();

  const fetchUser = async () => {
    try {
      await axios.get(`http://localhost:5005/user`).then((result) => {
        console.log(result.data);
        setUser(result.data);
        const role = result.data.role;
        console.log(result.data.userDetails._id);
        if (role === "teacher") {
          teachersClass(result.data.userDetails._id);
        }
        if (role === "student") {
          fetchStudentResults(result.data.userDetails._id);
        }
        fetchSubjects();
        setRolePro(role);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    setUser(user);
  }, []);

  const fetchStudentResults = async (id) => {
    try {
      await axios
        .get(`http://localhost:5005/student-result?studentId=${id}`)
        .then((result) => {
          console.log("result", result);
          setStudResult(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      axios.get(`http://localhost:5005/subjects`).then((result) => {
        setSubjects(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Students = async () => {
    try {
      await axios.get(`http://localhost:5005/students`).then((result) => {
        setStudents(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Teachers = async () => {
    try {
      await axios.get(`http://localhost:5005/teachers`).then((result) => {
        setTeachers(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Classes = async () => {
    try {
      await axios.get(`http://localhost:5005/classes`).then((result) => {
        setClasses(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Users = async () => {
    try {
      await axios.get(`http://localhost:5005/users`).then((result) => {
        setMainUsers(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Results = async () => {
    try {
      await axios.get(`http://localhost:5005/results`).then((result) => {
        setResults(result?.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const runExtra = async () => {
    Teachers();
    Students();
    Results();
    fetchSubjects();
    Users();
    Classes();
  };

  const teachersClass = async (teacherId) => {
    try {
      await axios
        .get(`http://localhost:5005/teacher-class?teacherId=${teacherId}`)
        .then((result) => {
          console.log(result);
          setTeachersClass(result?.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          results,
          students,
          classes,
          teachers,
          subjects,
          mainUsers,
          rolePro,
          runExtra,
          Users,
          teachersClas,
          fetchUser,
          setUser,
          studResult,
        }}
      >
        {children}
        <ToastContainer position="top-center" />
      </UserContext.Provider>
    </>
  );
};

export { UserContext };
