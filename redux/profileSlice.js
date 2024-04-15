import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Profile : [],
    userName : '',
}


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile : ( state, action ) => {
            state.Profile = action.payload;
        }
    }
})


export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;