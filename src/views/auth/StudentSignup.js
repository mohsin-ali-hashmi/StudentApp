import React,{useState} from 'react';
import { Container, Row , Col } from 'reactstrap';
import loginpic from "../../assets/img/student-main.png"
import naseempic from "../../assets/img/naseemlogo.png"
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import  {ThreeDots}  from "react-loader-spinner";
import { toast } from "react-toastify";
import { useUserAuth } from "../../config/auth";

const schema = yup.object().shape({
  code: yup.string().required("code is required"),
  userName: yup.string().required("user name is required"),
  email: yup.string().email().required(),
  //gender:yup.string().required("select any one of the field"),
  password: yup.string().min(6).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});


const StudentSignup = () => {
  const [loading, setLoading] = useState(false);
 

  const {register, handleSubmit, formState: { errors },
  reset} = useForm({
    
    resolver: yupResolver(schema),
  });

  const { signUp } = useUserAuth();
 

  const onHandleSubmit = async(data) =>{
    setLoading(true);
      const _data = {
          "request": {
            "method": "ClassCodeVerification",
            "data": {
                "class_id": data.code
            }
            }
          }
      const res = await fetch('.......',
      {
          method: "POST",
          headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              },
              body:JSON.stringify(_data),
      })
      .then((response) => response.json())
      .catch((err) => {
        toast.error("sorry check your connection or try again")
       });
       
       if(res.response.data.verified === true)
       {
        try {
          
          await signUp(data.email, data.password);
          setLoading(false);
          toast.success("successfully signed up")
          reset();
        } catch (err) {
            setLoading(false);
            if(err.code ==="auth/invalid-email")
            {
              toast.error("sorry invalid email type")
            }
            else if(err.code ==="auth/invalid-password")
            {
              toast.error("sorry invalid password it must meet the requirements")
            }
            else if(err.code === "auth/email-already-in-use")
            {
              toast.error("user with this email already exists")
            }
            else{
              console.log(err)
              toast.error("sorry error in signup try again")
            }
    
       }
      }
       else{
        toast.error("your code is wrong please enter right code")
       }
    reset();
  }


  return (
    <Container fluid className='loginRow py-0 px-0 mx-0'>
    <Row className='d-flex align-items-center text-center h-100 mx-0'>
        <Col className='dis w-50 mx-0'>
            <h2>Welcome to Naseem Student</h2>
             <img className='w-75 mt-3' src={loginpic} alt="no pic" />
        </Col>
        <Col className='align-items-center text-center w-50 mx-0'>
              <img className='w-25' src={naseempic} alt="no pic" />
              <h3 className='mt-2 mb-2'>Register Now</h3>
              <div className='mt-4'>
                  <form onSubmit={handleSubmit(onHandleSubmit)} className='d-flex flex-column align-items-center'>

                      <input type="tel" {...register("code")} className='authEmail  w-75 mb-1' placeholder='Enter Code' />
                      <p className="text-danger">{errors.code?.message}</p>
                      <input type="tel" {...register("userName")} className='authEmail  w-75 mb-1' placeholder='Enter User Name' />
                      <p className="text-danger">{errors.userName?.message}</p>
                      <input type="email" {...register("email")} className='authEmail w-75 mb-1' placeholder='Enter Email'/>
                      <p className="text-danger">{errors.email?.message}</p>
                        <p>please Select Your gender</p>
                      <div className='d-flex' style={{paddingBottom: "8px"}}>
                      <label htmlFor="field-male" style={{paddingRight: "15px"}}>
                        <input {...register("gendar", { required: true })}  
                        type="radio"
                        defaultChecked
                        value="Male"
                        id="field-male"
                        />
                        Male
                      </label>
                      <label htmlFor="field-female">
                        <input {...register("gendar", { required: true })}  
                        type="radio"
                       
                        value="female"
                        id="field-female"
                        />
                        Female
                      </label>
                      </div>
                      
                      <p className="text-danger">{errors.gender?.message}</p>
                      <input type="password" {...register("password")} className='authPassword w-75 mb-1' placeholder='Enter Password'/>
                      <p className="text-danger">{errors.password?.message}</p>
                      <input type="password" {...register("confirmPassword")} className='authPassword w-75 mb-1' placeholder='Confirm Password'/>
                      <p className="text-danger">{errors.confirmPassword?.message}</p>
                      <button type='submit' className='loginButton mb-4 w-25'>
                      {loading ? (
                      // <Loader type="ThreeDots" color="#fff" height={10} />
                      <ThreeDots color="#fff" height={10}/>) : ( "Register" )}
                      </button>
                  </form>
                  <p>already have an account? <Link to="/">login</Link></p>
              </div>
        </Col>
    </Row>
</Container>
  );
};

export default StudentSignup;
