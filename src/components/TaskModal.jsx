import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { editTasks } from '../redux/takeTasksSlice'
import { FaEdit } from 'react-icons/fa'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function Task({ selectedTask, setisOpen }) {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const [task, settask] = useState(selectedTask)

  function handleChange(event) {
    const { name, value } = event.target
    settask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      }
    })
  }

  const updateTask = () => {
    dispatch(editTasks(task))
  }

  const handleToggleStrike = () => {
    settask((prevTask) => ({
      ...prevTask,
      styles: toggleStyle(prevTask.styles, 'line-through'),
    }))
  }

  const toggleStyle = (styles, styleToToggle) => {
    styles = styles || ''

    return styles.includes(styleToToggle)
      ? styles.replace(styleToToggle, '').trim()
      : `${styles} ${styleToToggle}`.trim()
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2 w-full">
                        <p className=" text-gray-500">
                          {task && (
                            <textarea
                              className={`w-full outline rounded p-3 text-lg ${task.styles}`}
                              onChange={handleChange}
                              value={task.content}
                              name="content"
                              rows="4"
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-between items-center sm:px-6">
                  <div
                    onClick={handleToggleStrike}
                    className={
                      task.styles
                        ? 'px-2 text-xl cursor-pointer flex items-center bg-green-100 rounded-sm p-2'
                        : 'px-2 text-xl cursor-pointer flex items-center'
                    }
                  >
                    <IoIosCheckmarkCircle />{' '}
                    <span className="text-sm ml-1"> Mark as Done</span>
                  </div>
                  <div className="sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center items-center rounded-md bg-sky-600 hover:bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                      onClick={() => {
                        updateTask()
                        setOpen(false)
                        setisOpen(false)
                      }}
                    >
                      <FaEdit /> EDIT
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        updateTask()
                        setOpen(false)
                        setisOpen(false)
                      }}
                      ref={cancelButtonRef}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
