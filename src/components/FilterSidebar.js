import { amenitiesOptions } from '../data/properties';
import { useAppContext } from '../context/AppContext';

const neighborhoods = ['Any', 'Riverside', 'BKK1', 'Sala Kamreuk', 'Tonle Bassac', 'Sen Sok', 'Daun Penh'];
const propertyTypes = ['Any', 'House', 'Apartment', 'Villa', 'Townhouse', 'Condo'];

function FilterSidebar() {
  const { state, setFilters, resetFilters } = useAppContext();
  const { filters } = state;

  const onAmenityChange = (amenity, checked) => {
    const nextAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter((item) => item !== amenity);
    setFilters({ amenities: nextAmenities });
  };

  return (
    <aside className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Advanced filters">
      <div>
        <label htmlFor="query" className="mb-1 block text-sm font-medium">Search</label>
        <input id="query" value={filters.query} onChange={(e) => setFilters({ query: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2" placeholder="City, title..." />
      </div>
      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium">Location</label>
        <select id="location" value={filters.location} onChange={(e) => setFilters({ location: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2">
          {neighborhoods.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="minPrice" className="mb-1 block text-sm font-medium">Min Price</label>
          <input id="minPrice" type="number" min="0" value={filters.minPrice} onChange={(e) => setFilters({ minPrice: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-sm font-medium">Max Price</label>
          <input id="maxPrice" type="number" min="0" value={filters.maxPrice} onChange={(e) => setFilters({ maxPrice: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label htmlFor="propertyType" className="mb-1 block text-sm font-medium">Property Type</label>
        <select id="propertyType" value={filters.propertyType} onChange={(e) => setFilters({ propertyType: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2">
          {propertyTypes.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="bedrooms" className="mb-1 block text-sm font-medium">Bedrooms</label>
          <select id="bedrooms" value={filters.bedrooms} onChange={(e) => setFilters({ bedrooms: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2">
            {['Any', '1', '2', '3', '4'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms" className="mb-1 block text-sm font-medium">Bathrooms</label>
          <select id="bathrooms" value={filters.bathrooms} onChange={(e) => setFilters({ bathrooms: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2">
            {['Any', '1', '2', '3'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="minSize" className="mb-1 block text-sm font-medium">Min Size (sqft)</label>
        <input id="minSize" type="number" min="0" value={filters.minSize} onChange={(e) => setFilters({ minSize: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2" />
      </div>
      <fieldset>
        <legend className="mb-1 text-sm font-medium">Amenities</legend>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2">
              <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={(e) => onAmenityChange(amenity, e.target.checked)} />
              {amenity}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="sort" className="mb-1 block text-sm font-medium">Sort by</label>
        <select id="sort" value={filters.sort} onChange={(e) => setFilters({ sort: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2">
          <option value="newest">Newest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="most-viewed">Most Viewed</option>
        </select>
      </div>
      <button type="button" onClick={resetFilters} className="w-full rounded border border-slate-400 px-3 py-2 text-sm font-semibold hover:bg-slate-100">Reset filters</button>
    </aside>
  );
}

export default FilterSidebar;
