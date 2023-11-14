"use client"

import { deleteTodo, editTodo } from "@/api";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { FormEventHandler, useState } from "react";
import { FaEdit } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import Modal from "./Modal";

interface TaskProps{
    task:ITask;
}

const Task:React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit,setopenModalEdit] = useState<boolean>(false)
  const [openModalDelete,setopenModalDelete] = useState<boolean>(false)
  const [taskToEdit,setTaskToEdit] = useState<string>(task.text)

  const router = useRouter()
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e)=>{
    
    e.preventDefault()
    //console.log(newTaskValue)
    await editTodo({
      id:task.id,
      text:taskToEdit
    })
    //setTaskToEdit("")
    setopenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask= async(id: string)=>{
 
    await deleteTodo(id)
    setopenModalDelete(false)
    router.refresh()
    
  }
  return (
    <tr key={task.id}>
          <td className="w-full">{task.text}</td>
          <td className="flex gap-5">
            <FaEdit cursor={'pointer'} size={18} className={'text-blue-500'} onClick={()=> setopenModalEdit(true)}/>
            <Modal modalOpen={openModalEdit} setModalOpen={setopenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit Task</h3>
            <div className='modal-action'>
            <input value={taskToEdit} onChange={(e)=> setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-full text-sm" />
            <button className='btn  btn-neutral' type='submit'>Submit</button>
            </div>
          </form> 
        </Modal> 

            <FiTrash onClick={()=> setopenModalDelete(true)} cursor={'pointer'} size={18} className={'text-red-500'}/>
            <Modal modalOpen={openModalDelete} setModalOpen={setopenModalDelete}>
              <h3 className="text-lg">Are you sure you want to delete this task?</h3>
              <div className="modal-action">
                <button onClick={()=> handleDeleteTask(task.id)} className={'btn btn-error'}>Yes</button>
              </div>
            </Modal> 
            </td>
        </tr>
  )
}

export default Task