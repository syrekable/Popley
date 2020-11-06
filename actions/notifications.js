import { TRIGGER_WATER_NOTIFICATION, HANDLE_WATER_NOTIFICATION } from './types'
/*
  The idea is the following: 
    - the plant's time to water <= 0, so the plant
      screams that it's thirsty. 
    - user clicks the notif, and we handle it by opening
      a modal with plant's data and big, red button
      'water me'
    - after watering, user clicks this bad boy and timer resets.
*/

//get plant, and use its data to make a notification
export const triggerWaterNotification = plant => dispatch => {
  dispatch({
    type: TRIGGER_WATER_NOTIFICATION,
    payload: plant
  })
}

//get notification, which will give you all the info about
//the poor plant needing water
export const handleWaterNotification = notification => dispatch => {
  dispatch({
    type: HANDLE_WATER_NOTIFICATION,
    payload: notification
  })
}