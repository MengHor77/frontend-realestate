import { createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem('theme') || 'light';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: initialTheme,
    searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
    recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    addSearchHistory(state, action) {
      const query = action.payload.trim();
      if (!query) return;
      state.searchHistory = [query, ...state.searchHistory.filter((item) => item !== query)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
    },
    addRecentlyViewed(state, action) {
      const property = action.payload;
      if (!property?.id) return;
      state.recentlyViewed = [property, ...state.recentlyViewed.filter((item) => item.id !== property.id)].slice(0, 6);
      localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
    }
  }
});

export const { toggleTheme, addSearchHistory, addRecentlyViewed } = uiSlice.actions;
export default uiSlice.reducer;
