import { SET_APPLICATION_DETAILS } from "../../Actions/AppDetailsAction";


const appDetailsInitialState = {
    materials: [],
    plants: [],
    storageLocations: []
}
/**
 * Reducer logic.
 */
export default (state = appDetailsInitialState, action: any ) => {
    switch (action.type) {
     case SET_APPLICATION_DETAILS:
        return {
            ...state,
            materials: action.payload.materials,
            plants: action.payload.plants,
            storageLocations: action.payload.storageLocations
        }
     default:
      return state
    }
}