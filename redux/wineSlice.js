import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    Cellar : [],
    amount : 0,
    total : 0,
    isLoading: true
}


const cellarSlice = createSlice({
    name : 'cellar',
    initialState,
    reducers: {
        unBindCellar: (state, action) => {
            const cellarID = action.payload;
            state.Cellar = state.Cellar.map( (cellar) => cellar.id === cellarID ? { ...cellar, binded : false} : cellar
            )
        },
        deleteCellar: (state, action) => {
            const cellarID = action.payload;
            state.Cellar = state.Cellar.filter( ( cellar ) => cellar.id !== cellarID )
        },
        setCellar: ( state, action ) => {
            state.Cellar = action.payload;
        },
        editCellarSettings : ( state, action ) => {
            
            const { current, id, item } = action.payload;
            console.log(item)
            console.log("*******************************************************************8")
            state.Cellar = state.Cellar.map( (cellar) => cellar.id === id ? { ...cellar, ...item } : cellar
            )
            // console.log(update)
           
        }
    }
})

export const { unBindCellar } = cellarSlice.actions;
export const { deleteCellar } = cellarSlice.actions; 
export const { setCellar, editCellarSettings } = cellarSlice.actions
// console.log(cellarSlice)

export default cellarSlice.reducer;