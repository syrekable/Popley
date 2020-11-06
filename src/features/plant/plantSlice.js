import { createSlice } from '@reduxjs/toolkit'
import { timeToSeconds } from '../../utils'

export const plantSlice = createSlice({
  name: 'plant',
  initialState: {
    id: '',
    name: '',
    wateringInterval: {
      quantity: 1,
      interval: 'week'
    },
    timeToWater: 0,
    imgSource: ''
  },
  reducers: {
    add: (state, action) => {
      const plant = action.payload
      state.plants.push(plant)
    },
    edit: (state, action) => {
      state.edited = action.payload
    },
    remove: (state, action) => {
      state.plants = state.plants.filter(plant => plant.id !== action.payload.id)
    },
    water: (state, action) => {
      //find the clicked plant in the array using given id,
      //calculate new time to water
      //assign the new time to the plant
      //I truly hope that Immer works as well as I think it works, lol
      const [id, , wateringInterval, ,] = action.payload
      const timeToWater = timeToSeconds({
        quantity: wateringInterval.quantity,
        interval: wateringInterval.interval
      })
      state.plants.find(id).timeToWater = timeToWater;
    }
  }
})

export const {add, edit, remove, water} = plantSlice.actions

export default plantSlice.reducer