import { properties, testimonials } from '../data/properties';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const sorters = {
  newest: (a, b) => b.id - a.id,
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'most-viewed': (a, b) => b.views - a.views,
  featured: (a, b) => Number(b.featured) - Number(a.featured)
};

export async function fetchProperties(filters = {}) {
  await delay();

  const {
    listingType,
    location,
    minPrice,
    maxPrice,
    propertyType,
    minBeds,
    minBaths,
    minSize,
    maxSize,
    amenities = [],
    sort = 'newest'
  } = filters;

  let result = [...properties];

  if (listingType && listingType !== 'all') {
    result = result.filter((property) => property.listingType === listingType);
  }

  if (location) {
    const keyword = location.toLowerCase();
    result = result.filter(
      (property) => property.location.toLowerCase().includes(keyword) || property.city.toLowerCase().includes(keyword)
    );
  }

  if (minPrice) result = result.filter((property) => property.price >= Number(minPrice));
  if (maxPrice) result = result.filter((property) => property.price <= Number(maxPrice));
  if (propertyType && propertyType !== 'all') result = result.filter((property) => property.type === propertyType);
  if (minBeds) result = result.filter((property) => property.bedrooms >= Number(minBeds));
  if (minBaths) result = result.filter((property) => property.bathrooms >= Number(minBaths));
  if (minSize) result = result.filter((property) => property.size >= Number(minSize));
  if (maxSize) result = result.filter((property) => property.size <= Number(maxSize));
  if (amenities.length) {
    result = result.filter((property) => amenities.every((amenity) => property.amenities.includes(amenity)));
  }

  result.sort(sorters[sort] || sorters.newest);

  return {
    data: result,
    total: result.length
  };
}

export async function fetchPropertyById(id) {
  await delay();
  return properties.find((property) => property.id === Number(id)) || null;
}

export async function fetchHomeData() {
  await delay();
  return {
    stats: {
      totalProperties: properties.length,
      activeAgents: 24,
      happyCustomers: 1240
    },
    featured: properties.filter((property) => property.featured),
    testimonials
  };
}
