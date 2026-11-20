import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

// Use inside any component: const { favorites, toggleFavorite, isFavorite } = useFavorites();
export default function useFavorites() {
  const context = useContext(FavoritesContext);
  // A clear message if someone forgets the provider in App.js
  if (!context) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return context;
}