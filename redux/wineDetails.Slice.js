import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    CellarDetails : [],
    length : 0,
    isLoading : true,
}

const wineDetailsSlice = createSlice({
    name : 'wineDetails',
    initialState,
    reducers : {
        // getCellarDetails : ( state ) => {

        // },
        setCellarDetails : ( state, action ) => {
            if ( action.payload && action.payload.length != 0 ) {
                state.CellarDetails = action.payload;
                state.isLoading = false
            }

        }
    }
})

export const {setCellarDetails} = wineDetailsSlice.actions;

export default wineDetailsSlice.reducer;