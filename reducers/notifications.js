import { HANDLE_WATER_NOTIFICATION, TRIGGER_WATER_NOTIFICATION } from "../actions/types";

//an array of plants, for which tne notifications are triggered
const initialState = {
  notificatonsForPlants: []
}

export default function notificatons(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_WATER_NOTIFICATION: {
      return {
        ...state.notificatonsForPlants,
        notificatonsForPlants: action.payload
      }
    }
    case HANDLE_WATER_NOTIFICATION: {
      //pop the notification for plant which has been clicked by the user
      return {
        ...state.notificatonsForPlants,
        notificatonsForPlants: state.notificatonsForPlants.filter(plant => plant.id !== action.payload.id)
      }
    }
  }
}