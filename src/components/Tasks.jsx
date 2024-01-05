import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTasks } from '../redux/takeTasksSlice'
import Task from './TaskModal'
import { MdDelete } from 'react-icons/md'

function Tasks() {
  const tasks = useSelector((state) => state.tasks)
  const [isOpen, setisOpen] = useState(false)
  const [selctedTask, setselctedTask] = useState()

  const dispatch = useDispatch()
  const handleDeleteTask = (idx) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (isConfirmed) {
      dispatch(deleteTasks(idx))
    }
  }

  return (
    <div className="flex flex-col items-center ">
      {tasks.length > 0 &&
        tasks.map((task, idx) => (
          <div
            key={idx}
            className="w-5/6 md:w-1/2 relative rounded-md shadow-md shadow-gray-300 p-4 cursor-pointer border my-5"
          >
            <div
              onClick={() => {
                setselctedTask(task)
                setisOpen(!isOpen)
              }}
            >
              <p
                className={`text-md mb-2 text-pretty break-words ${task.styles}`}
              >
                {task.content}
              </p>
            </div>
            <button
              className="absolute -bottom-4 right-3 outline-none border rounded "
              onClick={() => handleDeleteTask(idx)}
            >
              <MdDelete className="text-3xl text-sky-600 hover:text-4xl bg-slate-100 shadow-lg rounded" />
            </button>
          </div>
        ))}
      {isOpen && <Task setisOpen={setisOpen} selectedTask={selctedTask} />}
    </div>
  )
}
export default Tasks
