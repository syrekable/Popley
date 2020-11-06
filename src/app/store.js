import { configureStore } from '@reduxjs/toolkit'
import plantReducer from '../features/plant/plantSlice'

export default configureStore({
  reducer: {
    plants: plantReducer,
  }
})