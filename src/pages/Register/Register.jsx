import React, { useState } from "react";
import image1 from "../../assets/notes1.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";

export default function Register() {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  const passwordRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const navigate = useNavigate()
  const [error , setError] = useState('')

  async function onSubmit(values) {
    try{
      const options = {
        url:'https://note-sigma-black.vercel.app/api/v1/users/signUp',
        method:'POST',
        data:values
      }
  
      const {data} = await axios.request(options)
      if(data.msg =='done'){
        navigate('/')
      }  
    }catch(err){
      console.log(err);
      
      setError(err.response.data.msg)
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required('name is required').min(3).max(15),
    email: yup.string().required('email is required').email('email must be valid'),
    password: yup.string().required('password is required').matches(passwordRegex, 'password must start with capital letter followed by 5 or more chars'),
    age: yup.string().required('age is required'),
    phone: yup.string().required('phone is required').matches(phoneRegex, 'phone must be valid')
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
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
                    type="text"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="text-danger fs-5 fw-semibold text-start">{formik.errors.name}</div>
                  ) : ''}
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

                  <input
                    type="number"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your age"
                    name="age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.age && formik.touched.age ? (
                    <div className="text-danger fs-5 fw-semibold text-start">{formik.errors.age}</div>
                  ) : ''}
                  <input
                    type="tel"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your phone number"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="text-danger fs-5 fw-semibold text-start">{formik.errors.phone}</div>
                  ) : ''}

                  <button className="btn btn-info text-white w-100 my-3">
                    Sign Up
                  </button>
                  <span>
                    already have an account ? <Link to={"/"}>login</Link>
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
