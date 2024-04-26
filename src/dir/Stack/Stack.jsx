import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "../Admin/pages/Admin";
import { Index } from "../pages/Index";
import { Error404 } from "../Admin/pages/Error404";
import { Users } from "../Admin/pages/Users";
import { Academic } from "../Admin/pages/Academic";
import { Teacher } from "../Teacher/pages/Teacher";
import { Classes } from "../Teacher/pages/Classes";
import { Results } from "../Teacher/pages/Results";
import { Student } from "../Student/pages/Student";
import { StudentClasses } from "../Student/pages/StudentClasses";
import { StudentResults } from "../Student/pages/StudentResults";

export const Stack = () => {
  return (
    <>
      <Routes>
        <Route index element={<Index />} />

        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="academic" element={<Academic />} />
        </Route>

        <Route path="/teacher">
          <Route index element={<Teacher />} />
          <Route path="classes" element={<Classes />} />
          <Route path="results" element={<Results />} />
        </Route>

        <Route path="/student">
          <Route index element={<Student />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="results" element={<StudentResults />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
