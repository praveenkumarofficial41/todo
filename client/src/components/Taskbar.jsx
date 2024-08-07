import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Taskbar = () => {
  const [task,setTask]=useState('')
  const [tasks,setTasks]=useState([])
  const [editTask,setEditTask]=useState('')
  const [idUpdate,setIdUpdate]=useState('')
  const unauth = () => toast.error('Unauthorized login');
  const token=window.sessionStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = token
useEffect(()=>{
  getTask()
},[])
  async function postTask(){
  try {
    let result=await axios.post('http://localhost:3001/task',{task})
    getTask()
  } catch (error) {
    console.log(error)
  }
 

}
  async function getTask(){
  try {
    let view=await axios.get('http://localhost:3001/view')
    if(view.data.statuscode==200){
    setTasks(view.data.data)
    } 
    else{
      unauth()
    }
  } catch (error) {
    console.log(error.message)
  }
}


async function deleteCall(id){
  try {
    let rem= await axios.delete('http://localhost:3001/delete/'+id) 
    getTask()
  } catch (error) {
    console.log(error.message)

  }
}

function editTasks(task,id){
  try {
    setEditTask(task)
    setIdUpdate(id)
    
  } catch (error) {
    console.log(error.message)

  }
}
  async function updateTask(){
  try {
    let up= await axios.put('http://localhost:3001/update/'+idUpdate,{editTask})
    getTask()
  } catch (error) {
    console.log(error.message)
  }
}
console.log(tasks)

  return <>
  <div className='container'>
    <div>
    <form onSubmit={postTask}>
    <input placeholder='Enter your task' className='form-control col-5 my-3' onChange={(e)=>setTask(e.target.value)}/>
    <button className='col-3 btn btn-primary' type='button' onClick={postTask}>Enter task</button>

    </form>
    </div>
    <div>
      <table class="table table-bordered ">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Tasks</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        {tasks.map((e,i)=>{return<>
        <tbody>
        <tr>
          <td>{i+1}</td>
          <td key={e._id}>{e?.task}</td>
          <td><button onClick={()=>editTasks(e.task,e._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className='col-5 btn btn-primary'>Edit</button></td>
          <td><button type="button" className='col-5 btn btn-danger' onClick={()=>deleteCall(e._id)}>Delete</button></td>
        </tr>
        </tbody>
        </>
        })}
      </table>
    </div>
  </div>







  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <input className='border wx-5' value={editTask} onChange={(e)=>setEditTask(e.target.value)}></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateTask} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div>
        <ToastContainer />
    </div>
  </>
}

export default Taskbar
