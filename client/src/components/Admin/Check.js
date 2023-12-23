import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";

const AdminChecker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state?.orebiReducer?.adminInfo);
  const getAdmin = async () => {
    try {
      const res = await Api.get("/master/api/v1/admin");
      if (res.data.message === "Ami admin") {
        const adm = res.data.data.email;
        if (
          adm === "mmhasan045@gmail.com" &&
          admin?.email === "mmhasan045@gmail.com"
        ) {
          navigate("/admin/dash");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);

      navigate("/error");
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return <div className="hidden">Admin Checker</div>; // You can customize this component as needed
};

export default AdminChecker;
