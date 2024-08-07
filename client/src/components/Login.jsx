import axios, { Axios } from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'

// import Signup from './Signup'

const Login = () => {
  const [name,setName]=useState('')
  const [pass,setPass]=useState('')
  const incorrect = () => toast.error('Incorrect username/password');  
  const navigate= useNavigate()
  const login=async ()=>{
    let data={
      username:name,
      password:pass
    }
    let response = await axios.post('http://localhost:3001/login',{data})
    console.log(response)
        if(response.data?.token){
          window.sessionStorage.setItem('token',response.data.token)
          navigate('/home')
        }
        else{
        if(response.data?.status==401 || response.data?.error){
          incorrect()
        }
        else{
          console.log(response)
        }
      }
  }
  





  return (<>
    <div className='d-flex justify-content-center'>
        <div className='container border w-25 p-5 mt-5 shadow-lg h-auto'>
        <h1 className='mb-4'>Login</h1>

            <form>
                <div className='form-floating border-bottom mb-4'>
                <input type="email" onChange={(e)=>setName(e.target.value)} class="form-control border border-0 shadow-none" id="floatingInput" placeholder="name@example.com" required/>
                <label for="floatingInput">Email address</label>
                </div>
                <div className='form-floating border-bottom mb-4'>
                <input type="Password" onChange={(e)=>setPass(e.target.value)} class="form-control border border-0 shadow-none" id="floatingInput" placeholder="name@example.com" required/>
                <label for="floatingInput">Password</label>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type="submit" onClick={login} className='btn btn-primary my-4 px-5'>Login</button><br/>
                </div>
                <div className='d-flex flex-column'>
                  <a href='#' className='text-decoration-none mb-3'>Forget Password</a>
                  <a href='/signup' className='text-decoration-none'>Create a new account</a>
                </div>
            </form>
        
        </div>
    </div>  
  

    <div>
        <ToastContainer />
    </div>
  </>
  )
}

export default Login
