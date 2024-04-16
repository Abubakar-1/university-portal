import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "../Admin/pages/Admin";
import { Index } from "../pages/Index";
import { Error404 } from "../Admin/pages/Error404";
import { Users } from "../Admin/pages/Users";
import { Academic } from "../Admin/pages/Academic";

export const Stack = () => {
  return (
    <>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};
