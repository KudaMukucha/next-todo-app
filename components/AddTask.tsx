"use client"

import { addTodo } from '@/api'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { v4 as uuidv4 } from 'uuid'
const AddTask = () => {
  const router = useRouter()
  const [modalOpen,setModalOpen]= useState<boolean>(false);
  const [newTaskValue,setNewTaskValue] = useState<string>('')
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e)=>{
    e.preventDefault()
    //console.log(newTaskValue)
    await addTodo({
      id:uuidv4(),
      text:newTaskValue
    })
    setNewTaskValue("")
    setModalOpen(false)
    router.refresh()
  }
  return (
    <>
    <div>
        <button onClick={()=> setModalOpen(true)} className="btn btn-primary w-full">Add new task <AiOutlinePlus size={18} className={'ml-2'}/></button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className='font-bold text-lg'>Add New Task</h3>
            <div className='modal-action'>
            <input value={newTaskValue} onChange={(e)=> setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-full text-sm" />
            <button className='btn  btn-neutral' type='submit'>Submit</button>
            </div>
          </form> 
        </Modal> 
    </div>
    </>
  )
}

export default AddTask