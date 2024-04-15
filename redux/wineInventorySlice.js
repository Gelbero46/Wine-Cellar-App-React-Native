import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    wineInventory : [],
    amount : 0,
    total : 0,
    isLoading: true
}

const wineInventorySlice = createSlice( {
    name : 'wineInventory',
    initialState,
    reducers : {
        setWineInventory : ( state, action ) => {
            state.wineInventory = action.payload;
            if (state.isLoading) {
                state.isLoading = false;
            }
            
        },
        setIsloading : ( state, action ) => {
            state.isLoading = action.payload
            console.log("Ok i entered **********************", state.isLoading)
        },
        updateRating : ( state, action ) => {
            console.log('Rating Updated')
            const myRating = action.payload
            state.wineInventory = state.wineInventory.map( (item) => item.myrating != myRating ? { ...item, myrating : myRating} : item)
        },

        deleteNote : ( state, action ) => {
            console.log('deleted Note ID', action.payload)
            const newState = state.wineInventory[0].note.filter(note => note.id !== action.payload)
            // // const newState = state.wineInventory[0].note.filter(  (note)  => {
            // //     note.id !== id
            // // })
            state.wineInventory = state.wineInventory.map( (item) => true ? {...item, note : newState} : item)
            // console.log("**********************",state.wineInventory)
            // console.log(state.wineInventory[0].note)
        },
        addNote: ( state, action ) => {
            console.log('addNote ***********************************************')
            console.log(action.payload)
            if (action.payload) {
                var test = state.wineInventory.map( (item) => true ? {...item, note : [...item.note, ...action.payload] } : item)
                console.log(test)
                // state.wineInventory = state.wineInventory.map( (item) => true ? {...item, note : {...item.note, ...action.payload}} : item)
                state.wineInventory = test
            }
        }
        
    }
   
} )

export const { setWineInventory } = wineInventorySlice.actions
export const { updateRating } = wineInventorySlice.actions
export const { deleteNote, addNote, setIsloading } = wineInventorySlice.actions

export default wineInventorySlice.reducer;