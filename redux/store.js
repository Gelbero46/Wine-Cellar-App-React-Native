import { configureStore } from "@reduxjs/toolkit"; 
import cellarReducer from './wineSlice'
import wineInventoryReducer from './wineInventorySlice'
import profileReducer from "./profileSlice";
import myWineListReducer from "./myWineList";

export const store = configureStore( {
    reducer: {
        cellar : cellarReducer,
        wineInventory : wineInventoryReducer,
        profile : profileReducer,
        wineList : myWineListReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
} )