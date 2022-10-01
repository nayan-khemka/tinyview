import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import "./CSS/Login.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { createToken, checkAuthentication } from '../util/authentication';

function Login(props) {
  const [response, setResponse] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false);
  const [postData, setPostData]= useState()
  let navigate= useNavigate();
  const loggedIn = checkAuthentication();

  useEffect(()=>{
    if (isSubmit){
      axios.post('http://182.70.249.68:9000/v1/user/login', postData)
      .then((res)=> {
        console.log(res);
        console.log("token is: "+res.data.data.token)
        createToken(res.data.data.token)
        if(checkAuthentication()){
          navigate('/dashboard', {replace: true})
        }
        else {
          setResponse(false)
        }
      })
    }
  }, [isSubmit])

  console.log(postData)
  
  return (
    <div className='text-center mt-5'>
      <div className='header'>Admin Login</div>
        <Formik
        initialValues={{email: "", password : ""}}
        validationSchema = {
            Yup.object({
                email : Yup.string().email("Invalid email address").required("Required"),
                password : Yup.string()
                .required("Required")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/ ,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                )
                .min(8).max(16)
                
            })
        }
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              setPostData(values);
              setIsSubmit(true);
            }, 400);
          }}
        >
          <div className='loginForm mx-auto col-lg-6'>
            <Form>
              <div className='row'>
                <div className='mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <div className='form-group mt-2'>
                      <Field name="email" className="form-control red" placeholder="Enter Email Id"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="email" className='error' /></div>
                    </div>
                </div>
              </div>
              <div className='row'>
              <div className='mb-2 mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <div className='form-group mt-2'>
                      <Field name="password" type="password" className="form-control red" placeholder="Enter Password"></Field>
                      <div className='errormessage' style={{ color: "red" }} >
                      <ErrorMessage name="password" className='error' /></div>
                  </div>
                  {response ? <></> : <div className='errormessage' style={{ color: "red" }} >
                    <ErrorMessage className='error'>Wrong</ErrorMessage>
                  </div> }  
              </div> 
              </div>
              <div className='row'>
                <div className='mb-sm-3 mb-lg-4 col-sm-12 col-12'>
                  <button className="btn btn-primary btn-login text-light" type='submit' id='button'>Login</button>
                </div>  
              </div>              
            </Form>
          </div>
        
        </Formik>
        {(!loggedIn && isSubmit)? <div className='loginError'>Wrong Credentials</div>:<></>}
        <div className='bg-curve'></div>
    </div>
  )
}

export default Login;