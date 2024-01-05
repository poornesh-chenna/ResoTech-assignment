import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTasks } from '../redux/takeTasksSlice'
import { nanoid } from '@reduxjs/toolkit'
import { GrAdd } from 'react-icons/gr'

function CreateTasks({ settasks }) {
  const dispatch = useDispatch()
  const [task, settask] = useState({
    content: '',
    styles: '',
  })
  function handleChange(event) {
    const { name, value } = event.target
    settask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      }
    })
  }

  function addTask(event) {
    event.preventDefault()

    if (!task.content) {
      alert('Please enter the content')
      return
    }
    dispatch(addTasks({ ...task, id: nanoid() }))
    settask({
      content: '',
      styles: '',
    })
  }

  return (
    <div>
      <form className="relative w-5/6 md:w-1/2 p-4 rounded-md shadow-md mx-auto mt-8 my-12 border">
        <textarea
          className={`text-xl font-inherit w-full border-0 p-2 outline-none ${task.styles}`}
          onChange={handleChange}
          value={task.content}
          name="content"
          placeholder="Add Task"
          rows="3"
        />

        <button
          className="absolute right-8 -bottom-5 bg-sky-600 hover:bg-sky-500 rounded-md border-0 text-white w-10 h-10 shadow-lg flex justify-center items-center outline-none"
          onClick={addTask}
        >
          <GrAdd className="text-3xl p-1 hover:text-4xl" />
        </button>
      </form>
    </div>
  )
}

export default CreateTasks
