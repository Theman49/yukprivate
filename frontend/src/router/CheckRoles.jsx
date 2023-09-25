import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckRoles = ({ role, children }) => {
  let isRole = useSelector((state) => state.auth.role);
  if(!isRole){
    isRole = localStorage.getItem('role')
  }

  return isRole == role ? (
    children 
  ) : (
    <Navigate to="/dashboard/home" replace />
  );

};

export default CheckRoles;
