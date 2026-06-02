import { createContext, useContext, useMemo, useReducer } from 'react';
import { defaultFilters, properties } from '../data/properties';

const AppContext = createContext(null);

const initialState = {
  properties,
  wishlist: [],
  savedSearches: [],
  filters: defaultFilters,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'toggleWishlist': {
      const exists = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    }
    case 'setFilters':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'resetFilters':
      return {
        ...state,
        filters: defaultFilters,
      };
    case 'saveSearch':
      return {
        ...state,
        savedSearches: [...state.savedSearches, action.payload],
      };
    default:
      return state;
  }
}

function sortProperties(items, sortBy) {
  switch (sortBy) {
    case 'price-low-high':
      return [...items].sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return [...items].sort((a, b) => b.price - a.price);
    case 'most-viewed':
      return [...items].sort((a, b) => b.views - a.views);
    default:
      return [...items].sort((a, b) => b.id - a.id);
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const filteredProperties = useMemo(() => {
    const {
      query,
      location,
      minPrice,
      maxPrice,
      propertyType,
      mode,
      bedrooms,
      bathrooms,
      minSize,
      amenities,
      sort,
    } = state.filters;

    const normalizedQuery = query.trim().toLowerCase();

    const filtered = state.properties.filter((property) => {
      const matchesQuery = !normalizedQuery
        || property.title.toLowerCase().includes(normalizedQuery)
        || property.location.toLowerCase().includes(normalizedQuery);
      const matchesLocation = location === 'Any' || property.neighborhood === location;
      const matchesPrice = property.price >= Number(minPrice) && property.price <= Number(maxPrice);
      const matchesType = propertyType === 'Any' || property.type === propertyType;
      const matchesMode = mode === 'Any' || property.mode === mode;
      const matchesBedrooms = bedrooms === 'Any' || property.beds >= Number(bedrooms);
      const matchesBathrooms = bathrooms === 'Any' || property.baths >= Number(bathrooms);
      const matchesSize = property.size >= Number(minSize);
      const matchesAmenities = amenities.length === 0
        || amenities.every((amenity) => property.amenities.includes(amenity));

      return matchesQuery
        && matchesLocation
        && matchesPrice
        && matchesType
        && matchesMode
        && matchesBedrooms
        && matchesBathrooms
        && matchesSize
        && matchesAmenities;
    });

    return sortProperties(filtered, sort);
  }, [state.filters, state.properties]);

  const value = {
    state,
    filteredProperties,
    toggleWishlist: (id) => dispatch({ type: 'toggleWishlist', payload: id }),
    setFilters: (payload) => dispatch({ type: 'setFilters', payload }),
    resetFilters: () => dispatch({ type: 'resetFilters' }),
    saveSearch: (name) => dispatch({ type: 'saveSearch', payload: { id: Date.now(), name, filters: state.filters } }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
}
