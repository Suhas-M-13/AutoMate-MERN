import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import "./addshop.css"
import axios from 'axios'

const AddShop = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const [message, setmessage] = useState("")

  const navigate = useNavigate()

  const onSubmit = async (data) => {

    console.log(data);
    
    const response = await axios.post("http://localhost:1969/user",data)

    console.log("response : "+response);
    

    if(response.success === true){
      console.log("succesfully added to database");
      navigate('/addshop')
      
    }
    else{
      console.log("cannot add to database");

    }
    setmessage(response.data.message)

  }

  return (
    <>
      <div className='maindivforlogin'>
        <h2>Add Valid Details!</h2>
        <div className="container">
          {isSubmitting && <div>Loading...</div>}
          <form className='form-box' action="" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("shopname", {
              required: true,
            })} type="text" placeholder='Enter Shopname' />

            <input {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })} type="text" placeholder='Enter Email' />

            <input {...register("latitude", {
              required: true,
            })} type="text" placeholder='Enter latitude' />

            <input {...register("longitude", {
              required: true, 
            })} type="text" placeholder='Enter longitude' />

            <button disabled={isSubmitting} type="submit">Add Shop</button>
            <a href="/">Home</a>

          </form>
          <div className="errors">
            <p>{errors.username && errors.username.message}</p>
            <p>{errors.email && errors.email.message}</p>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddShop
