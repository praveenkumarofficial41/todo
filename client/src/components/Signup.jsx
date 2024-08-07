import React, { useState } from 'react'
import axios, { Axios }from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const [name,setName]=useState('')
  const [pass,setPass]=useState('')
  const [confirmPass,SetConfirmPass]=useState('')
  const [passErr,setPassErr]=useState(false)
  const duplicate = () => toast.error('Gmail is already in use');
  const navigate = useNavigate()

  async function signup(){

    let data={
      username:name,
      password:pass
    }
    if(pass==confirmPass){
      let response = await axios.post('http://localhost:3001/signup',{data})
      if(response.data?.error?.code==11000){
        duplicate()
      }
      else{
        if(response.data?.token){
          window.sessionStorage.setItem('token',response.data.token)
          navigate('/home')
        }
      }
    }
    else{
      setPassErr(true)
    }
  }



  return (<>
    <div className='d-flex justify-content-center'>
        <div className='container border w-25 p-5 mt-5 shadow-lg'>
        <h1 className='mb-4'>Sign up</h1>

            <form onSubmit={signup}>
                <div className='form-floating border-bottom'>
                <input type="email" onChange={(e)=>setName(e.target.value)} class="form-control border border-0 shadow-none" id="floatingInput" placeholder="name@example.com" required/>
                <label for="floatingInput">Email address</label>
                </div>        
                <div className='form-floating border-bottom mt-4 mb-4'>
                <input type="Password" onChange={(e)=>setPass(e.target.value)} class="form-control border border-0 shadow-none" id="floatingInput" placeholder="Password" required/>
                <label for="floatingInput">Password</label>
                </div>
                <div className='form-floating border-bottom mb-4'>
                <input type="Password" onChange={(e)=>SetConfirmPass(e.target.value)} class="form-control border border-0 shadow-none" id="floatingInput" placeholder="Confirm password" required/>
                <label for="floatingInput">Confirm password</label>
                </div>
                {passErr?<span className='text-danger'>Password not matching</span>:null}
                <div className='d-flex justify-content-end'>
                  <button type="button" onClick={signup} className='btn btn-primary mt-3 px-5 mb-4'>Sign</button>
                </div>
                <a href='/' className='text-decoration-none'>Already have an account</a>
            </form>
        
        </div>
    </div>  
  



    <div>
        <ToastContainer />
    </div>

  </>
  )
}

export default Signup
