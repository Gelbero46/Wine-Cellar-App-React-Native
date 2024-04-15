import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    myWineList : []
}

const myWineListSlice = createSlice({
    name : 'wineList',
    initialState,
    reducers : {
        setMywineList : ( state, action ) => {
            state.myWineList =  action.payload
        }
    }
})

export const {setMywineList} = myWineListSlice.actions;

export default myWineListSlice.reducer;

// npx react-native run-android

// npx react-native start