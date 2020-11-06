import { ADD_PLANT, EDIT_PLANT, DELETE_PLANT, READ_PLANTS, STORE_PLANTS } from '../actions/plants'

const initialState = {
  plants: []
};

export default function plants(state = initialState, action) {
  switch (action.type) {
    case ADD_PLANT: {
      console.log(`Adding ${action.payload.plants} new plants!`);
      return {
        plants: [...state.plants, action.payload]
      }
    }
    case EDIT_PLANT: {
      //open the AddPlant screen with this plant's data
    }
    case DELETE_PLANT: {
      //pop plant with given id from the plants
      console.log(`Deleting the poor '${action.payload.name}' from your plants.`)
      return {
        ...state.plants,
        plants: state.plants.filter(plant => plant !== action.payload.id)
      };
    }
    //some async needed for next two
    case STORE_PLANTS: {
      //open db, store the plants, back to business
    }
    case READ_PLANTS: {
      //fired at startup; return plants from db or an error
    }
    default:
      return state;
  }
}