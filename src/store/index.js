import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import propertyReducer from './slices/propertySlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    property: propertyReducer
  }
});

export default store;
