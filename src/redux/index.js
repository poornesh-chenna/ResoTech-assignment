import { combineReducers } from '@reduxjs/toolkit'
import takeTasks from './takeTasksSlice'

const rootReducer = combineReducers({
  tasks: takeTasks,
})

export default rootReducer
