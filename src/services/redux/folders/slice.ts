import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  folders: []
}

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      return action.payload
    }
  }
})

export const {
  setFolders
} = foldersSlice.actions

export default foldersSlice.reducer