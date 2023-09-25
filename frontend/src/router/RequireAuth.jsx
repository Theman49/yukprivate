import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import Verification from "../pages/auth/Verification";
import Roles from "../pages/auth/Roles";
import FirstBiodataStudent from '../../src/pages/auth/student/FirstBiodata'
import FirstBiodataTentor from '../../src/pages/auth/tentor/FirstBiodata'

const RequireAuth = () => {
  let {isAuth, token, user, role} = useSelector((state) => state.auth);
  let location = useLocation();

  if(!isAuth){
    isAuth = localStorage.getItem('isAuth')
    token = localStorage.getItem('token')
    role = localStorage.getItem('role')
    user = JSON.parse(localStorage.getItem('user'))
  }

  if(token == null){
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const isVerified = user.isVerifiedEmail

  const roleSession = sessionStorage.getItem('role')

  return !isVerified ? (
    <Verification />
    // <Navigate to="/verification" state={{ from: location }} replace />
  ) : (
    role == null ? ( 
      roleSession == null ? (
        <Roles />
      )  : (
        roleSession == 'student' ? (<FirstBiodataStudent />) : (<FirstBiodataTentor />)
      )
    ) : (
      <Outlet />
    )
  )
};

export default RequireAuth;
