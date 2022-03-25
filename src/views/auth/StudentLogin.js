import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";
import loginpic from "../../assets/img/student-main.png";
import naseempic from "../../assets/img/naseemlogo.png";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserAuth } from "../../config/auth";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const StudentLogin = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { logIn } = useUserAuth();

  const onHandleSubmit = async (data) => {
    setLoading(true);
    const _data = {
      request: {
        method: "getStudentByEmail",
        data: {
          email: data.email,
        },
      },
    };
    const res = await fetch(".........", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
    })
      .then((response) => response.json())
      .catch((err) => {
        toast.error("sorry check your connection or try again");
      });
      
    localStorage.setItem("SchoolId", res.response.data.student.schoolId);
    localStorage.setItem("ClassId", res.response.data.student.classId)
    localStorage.setItem("StudentId", res.response.data.student._id);

    try {
      await logIn(data.email, data.password);
      setLoading(false);
      reset();
      history.replace("/student");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        toast.error("sorry user is not found");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many wrong attempts try again later");
      } else if (err.code === "auth/account-exists-with-different-credential") {
        toast.error("user has different credentials");
      } else if (err.code === "auth/wrong-password") {
        toast.error("email or password is wrong try again");
      } else if (err.code === "auth/internal-error") {
        toast.error("There seems to be a problem from our side sorry");
      } else {
        console.log(err);
        toast.error("error please check your internet connection");
      }
    }
    reset();
  };

  return (
    <Container fluid className="loginRow py-0 px-0 mx-0">
      <Row className="d-flex align-items-center text-center h-100 mx-0">
        <Col className="dis w-50 mx-0">
          <h2>Welcome to Naseem Student</h2>
          <img className="w-75 mt-3" src={loginpic} alt="no pic" />
        </Col>
        <Col className="align-items-center text-center w-50 mx-0">
          <img className="w-25" src={naseempic} alt="no pic" />
          <h3 className="mt-3 mb-5">Get Started Now</h3>
          <div className="mt-4">
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="d-flex flex-column align-items-center"
            >
              <input
                type="email"
                className="authEmail w-75 mb-4"
                {...register("email")}
                placeholder="Enter Email"
              />
              <p className="text-danger">{errors.email?.message}</p>
              <input
                type="password"
                className="authPassword w-75 mb-4"
                
                {...register("password")}
                placeholder="Enter Password"
              />
              <p className="text-danger">{errors.password?.message}</p>
              <button className="loginButton mb-4 w-25">
                {loading ? <ThreeDots color="#fff" height={10} /> : "Login"}
              </button>
            </form>
            <Link to="/studentsignup">
              <h3>Register Now</h3>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentLogin;
