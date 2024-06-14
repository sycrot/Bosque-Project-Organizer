import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  projects: []
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      return action.payload
    },
  }
})

export const {
  setProjects,
} = projectsSlice.actions

export default projectsSlice.reducer