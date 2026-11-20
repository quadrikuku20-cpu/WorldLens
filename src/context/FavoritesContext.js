import React, { createContext, useReducer } from 'react';

export const FavoritesContext = createContext(null);

// The reducer decides how the favorites list changes for each action
function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.some((c) => c.code === action.country.code);
      // Already saved: remove it. Not saved yet: add it.
      return exists
        ? state.filter((c) => c.code !== action.country.code)
        : [...state, action.country];
    }
    default:
      return state;
  }
}

// Wrap the app in this so every screen can read and change the favorites
export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const toggleFavorite = (country) => dispatch({ type: 'TOGGLE', country });
  const isFavorite = (code) => favorites.some((c) => c.code === code);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// TODO (Marc): wrap <AppNavigator /> in <FavoritesProvider> inside App.js.
// The list resets when the app closes. That is fine for this project.