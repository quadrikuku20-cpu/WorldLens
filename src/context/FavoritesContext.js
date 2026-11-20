import React, { createContext, useReducer } from 'react';

export const FavoritesContext = createContext(null);

// The reducer decides how the favorites list changes for each action
function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.some((country) => country.code === action.country.code);
      // Already saved: remove it. Not saved yet: add it.
      return exists
        ? state.filter((country) => country.code !== action.country.code)
        : [...state, action.country];
    }
    default:
      return state;
  }
}

// Wrap the app in this so every screen can read and change the favorites.
// The list resets when the app closes, which is fine for this project.
export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const toggleFavorite = (country) => dispatch({ type: 'TOGGLE', country });
  const isFavorite = (code) => favorites.some((country) => country.code === code);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}