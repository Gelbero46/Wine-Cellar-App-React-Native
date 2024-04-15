import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    FavoriteWine : []
}

const favoriteSlice = createSlice({
    name : 'favorite',
    initialState,
    reducers: {
        setFavoriteWine : ( state, action ) => {
            state.FavoriteWine = action.payload
        }
    }
})

export const { setFavoriteWine } = favoriteSlice.actions;

export default favoriteSlice.reducer;