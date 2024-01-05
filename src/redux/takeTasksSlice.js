import { createSlice } from '@reduxjs/toolkit'

const takeTasksSlice = createSlice({
  name: 'task',
  initialState:
    localStorage.getItem('items') !== null
      ? JSON.parse(localStorage.getItem('items'))
      : [],
  reducers: {
    addTasks: (state, action) => {
      state.unshift(action.payload)
      saveItemsInLocalStorage(state)
    },
    deleteTasks: (state, action) => {
      state.splice(action.payload, 1)
      saveItemsInLocalStorage(state)
    },
    editTasks: (state, action) => {
      const index = state.findIndex(
        (task) => task.id.toString() === action.payload.id.toString()
      )
      if (index !== -1) {
        state[index] = action.payload
      }
      saveItemsInLocalStorage(state)
    },
  },
})

const saveItemsInLocalStorage = (state) => {
  localStorage.setItem('items', JSON.stringify(state))
}

export const { addTasks, deleteTasks, editTasks } = takeTasksSlice.actions

export default takeTasksSlice.reducer
