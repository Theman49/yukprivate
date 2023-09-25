import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Home from "../pages/home/Home";
import ExploreTentor from "../pages/home/ExploreTentor";
import Booking from "../pages/home/Booking";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Verification from "../pages/auth/Verification";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerificationPassword from "../pages/auth/VerificationPassword";
import Roles from "../pages/auth/Roles";

import FirstStudentBiodata from "../pages/auth/student/FirstBiodata";
import AddressStudentBiodata from "../pages/auth/student/AddressBiodata";
import StudentBiodataFinal from "../pages/auth/student/BiodataFinal";

import FirstTentorBiodata from "../pages/auth/tentor/FirstBiodata";
import AddressTentorBiodata from "../pages/auth/tentor/AddressBiodata";
import EducationTentorBiodata from "../pages/auth/tentor/LastEducationBiodata";
import ExperienceTentorBiodata from "../pages/auth/tentor/ExperienceBiodata";
import AchievementTentorBiodata from "../pages/auth/tentor/AchievementBiodata";
import ProposalTentorBiodata from "../pages/auth/tentor/ProposalBiodata";
import TentorBiodataFinal from "../pages/auth/tentor/BiodataFinal";

import Dashboard from "../pages/dashboard/Dashboard";
import Schedule from "../pages/dashboard/Schedule";
import Tentor from "../pages/dashboard/Tentor";
import TentorProfile from "../pages/dashboard/TentorProfile";
import Transaction from "../pages/dashboard/Transaction";
import AccountConfiguration from "../pages/dashboard/AccountConfiguration";
import NotFound404 from "../pages/Error404";
import CheckRoles from "./CheckRoles";

const Router = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<RequireAuth />}>
        <Route
          path="profile"
          element={
            <CheckRoles role="tentor">
              <TentorProfile />
            </CheckRoles>
          }
        />
        <Route
          path="transaction"
          element={
            <CheckRoles role="student">
              <Transaction />
            </CheckRoles>
          }
        />
        <Route
          path="tentor"
          element={
            <CheckRoles role="student">
              <Tentor />
            </CheckRoles>
          }
        />
        <Route path="account" element={<AccountConfiguration />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="home" element={<Dashboard />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/verification" element={<Verification />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/student/first" element={<FirstStudentBiodata />} />
        <Route
          path="/student/second"
          element={
            <CheckRoles role="student">
              <AddressStudentBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/student/final"
          element={
            <CheckRoles role="student">
              <StudentBiodataFinal />
            </CheckRoles>
          }
        />

        <Route path="/tentor/first" element={<FirstTentorBiodata />} />
        <Route
          path="/tentor/second"
          element={
            <CheckRoles role="tentor">
              <AddressTentorBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/tentor/third"
          element={
            <CheckRoles role="tentor">
              <EducationTentorBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/tentor/fourth"
          element={
            <CheckRoles role="tentor">
              <ExperienceTentorBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/tentor/fifth"
          element={
            <CheckRoles role="tentor">
              <AchievementTentorBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/tentor/six"
          element={
            <CheckRoles role="tentor">
              <ProposalTentorBiodata />
            </CheckRoles>
          }
        />
        <Route
          path="/tentor/final"
          element={
            <CheckRoles role="tentor">
              <TentorBiodataFinal />
            </CheckRoles>
          }
        />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verification-password" element={<VerificationPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/explore" element={<ExploreTentor />} />
      <Route path="/explore/booking" element={<Booking />}>
        <Route path=":tentorId" element={<Booking />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default Router;
