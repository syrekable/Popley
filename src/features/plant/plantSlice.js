import { createSlice } from '@reduxjs/toolkit'
import { timeToSeconds } from '../../app/utils'

export const plantSlice = createSlice({
  name: 'plant',
  initialState: [
    {
      id: '',
      name: 'Monstera',
      wateringInterval: {
        quantity: 1,
        interval: 'week'
      },
      timeToWater: 21374,
      image: 'https://bi.im-g.pl/im/70/b4/18/z25907056V,Kwiat-monstera-w-optymalnych-warunkach-osiaga-200-.jpg'
    },
    {
      id: '',
      name: 'Burak',
      wateringInterval: {
        quantity: 3,
        interval: 'day'
      },
      timeToWater: 0,
      image: 'https://naturapluszdrowie.pl/wp-content/uploads/2017/05/Fotolia_117232374_Subscription_Monthly_M.jpg'
    },
  ],
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

export const { add, edit, remove, water } = plantSlice.actions

export default plantSlice.reducer