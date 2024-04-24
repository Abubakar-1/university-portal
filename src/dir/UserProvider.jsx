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

  const fetchUser = async () => {
    try {
      await axios.get(`http://localhost:5005/user`).then((result) => {
        setUser(result.data);
        console.log(result.data);
        const role = result.data.role;
        setRolePro(role);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        }}
      >
        {children}
        <ToastContainer position="top-center" />
      </UserContext.Provider>
    </>
  );
};

export { UserContext };
