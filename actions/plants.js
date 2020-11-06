import {ADD_PLANT, EDIT_PLANT, DELETE_PLANT} from './types'

export const addPlant = plant => dispatch =>{
  dispatch({
    type: ADD_PLANT,
    payload: plant
  })
}

export const editPlant = plant => dispatch =>{
  dispatch({
    type: EDIT_PLANT,
    payload: plant
  })
}

export const deletePlant = plant => dispatch =>{
  dispatch({
    type: DELETE_PLANT,
    payload: plant
  })
}
