import React, { useContext, useState } from "react";
import image1 from "../../assets/notes1.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { userContext } from "../../context/user.context";

export default function Login() {
  const passwordRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const navigate = useNavigate()
  const [error , setError] = useState('')
  const {token , setToken} = useContext(userContext)

  async function onSubmit(values) {
    try{
      const options = {
        url:'https://note-sigma-black.vercel.app/api/v1/users/signIn',
        method:'POST',
        data:values
      }
  
      const {data} = await axios.request(options)
      console.log(data);
      
      if(data.msg =='done'){
        localStorage.setItem('usertoken',data.token)
        console.log('1');
        
        setToken('as')
        console.log('2');
        navigate('/home')
      }  
    }catch(err){
      console.log('3');
      setError('email or password is incorrect')
    }
  }

  const validationSchema = yup.object({
    email: yup.string().required('email is required').email('email must be valid'),
    password: yup.string().required('password is required').matches(passwordRegex, 'password must start with capital letter followed by 5 or more chars'),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5 d-none d-lg-flex justify-content-center align-items-center py-5">
            <img src={image1} className="w-100 p-5" alt="" />
          </div>

          <div className="col-md-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center">
              <div className="bg-light bg-opacity-25 shadow p-5 rounded-2 w-100">
                <h1 className="fw-bold">signup Now</h1>
                {error ? <h4 className="text-danger fw-semibold fs-4">{error}</h4>:''}
                <form className="pt-3" onSubmit={formik.handleSubmit}>

                  <input
                    type="email"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger fs-5 fw-semibold text-start">{formik.errors.email}</div>
                  ) : ''}
                  <input
                    type="password"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-danger fs-5 fw-semibold text-start">{formik.errors.password}</div>
                  ) : ''}

                 

                  <button className="btn btn-info text-white w-100 my-3">
                    Sign In
                  </button>
                  <span>
                    dont't have an account ? <Link to={"/register"}>register</Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
