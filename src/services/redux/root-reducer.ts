import { combineReducers } from "redux"
import projectsReducer from './projects/slice'
import foldersReducer from './folders/slice'

const rootReducer = combineReducers({ projectsReducer, foldersReducer })

export default rootReducer