import { SET_APPLICATION_DETAILS,SET_USER_APPLICATIONS } from "../../Actions/AppDetailsAction";


const appDetailsInitialState = {
    masterData: [],
    materials: [],
    plants: [],
    storageLocations: [],
    applicationList: []
}
/**
 * Reducer logic.
 */
export default (state = appDetailsInitialState, action: any ) => {
    switch (action.type) {
     case SET_USER_APPLICATIONS: 
        return {
            ...state,
            applicationList: action.payload
        };
     case SET_APPLICATION_DETAILS:
        return {
            ...state,
            ...(action.payload.viewData ? {masterData: action.payload.viewData} : {}),
            ...(action.payload.materials ? {materials: action.payload.materials} : {}),
            ...(action.payload.plants ? {plants: action.payload.plants} : {}),
            ...(action.payload.barcode ? {barcode: action.payload.barcode} : {}),
            ...(action.payload.storageLocations ? {storageLocations: action.payload.storageLocations} : {})
        }
     default:
      return state
    }
}