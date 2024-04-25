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

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
