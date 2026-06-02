import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../../services/mockApi';
import { toggleWishlist, toggleCompare } from '../../store/slices/propertySlice';

const allAmenities = ['Parking', 'Pool', 'Garden', 'Gym', 'Security'];

function Listings() {
  const [params, setParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');

  const filters = useMemo(
    () => ({
      location: params.get('location') || '',
      listingType: params.get('listingType') || 'all',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      propertyType: params.get('propertyType') || 'all',
      minBeds: params.get('minBeds') || '',
      minBaths: params.get('minBaths') || '',
      minSize: params.get('minSize') || '',
      maxSize: params.get('maxSize') || '',
      amenities: params.getAll('amenities'),
      sort: params.get('sort') || 'newest'
    }),
    [params]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters)
  });

  const wishlist = useSelector((state) => state.property.wishlist);
  const compare = useSelector((state) => state.property.compare);
  const dispatch = useDispatch();

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  const toggleAmenity = (amenity) => {
    const next = new URLSearchParams(params);
    const existing = next.getAll('amenities');
    next.delete('amenities');
    const updated = existing.includes(amenity) ? existing.filter((item) => item !== amenity) : [...existing, amenity];
    updated.forEach((item) => next.append('amenities', item));
    setParams(next);
  };

  const resetFilters = () => setParams(new URLSearchParams());

  if (isLoading) return <p aria-busy="true">Loading properties...</p>;
  if (isError) return <p role="alert">Unable to load property listings.</p>;

  return (
    <div className="row g-4">
      <aside className="col-lg-3">
        <div className="border rounded p-3">
          <h1 className="h5">Filters</h1>
          <label className="form-label">Location</label>
          <input className="form-control mb-2" value={filters.location} onChange={(e) => setFilter('location', e.target.value)} />

          <label className="form-label">Price range</label>
          <div className="d-flex gap-2 mb-2">
            <input type="number" className="form-control" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilter('minPrice', e.target.value)} />
            <input type="number" className="form-control" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)} />
          </div>

          <label className="form-label">Property Type</label>
          <select className="form-select mb-2" value={filters.propertyType} onChange={(e) => setFilter('propertyType', e.target.value)}>
            <option value="all">All</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
            <option>Commercial</option>
            <option>Land</option>
          </select>

          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label">Beds</label>
              <select className="form-select" value={filters.minBeds} onChange={(e) => setFilter('minBeds', e.target.value)}>
                <option value="">Any</option>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Baths</label>
              <select className="form-select" value={filters.minBaths} onChange={(e) => setFilter('minBaths', e.target.value)}>
                <option value="">Any</option>
                <option value="0">0+</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>

          <label className="form-label">Size (sqft)</label>
          <div className="d-flex gap-2 mb-2">
            <input type="number" className="form-control" placeholder="Min" value={filters.minSize} onChange={(e) => setFilter('minSize', e.target.value)} />
            <input type="number" className="form-control" placeholder="Max" value={filters.maxSize} onChange={(e) => setFilter('maxSize', e.target.value)} />
          </div>

          <p className="mb-1 fw-semibold">Amenities</p>
          {allAmenities.map((amenity) => (
            <div className="form-check" key={amenity}>
              <input
                className="form-check-input"
                type="checkbox"
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              <label className="form-check-label" htmlFor={amenity}>{amenity}</label>
            </div>
          ))}

          <label className="form-label mt-2">Sort</label>
          <select className="form-select mb-3" value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-low">Price Low-High</option>
            <option value="price-high">Price High-Low</option>
            <option value="most-viewed">Most viewed</option>
            <option value="featured">Featured</option>
          </select>

          <button className="btn btn-outline-secondary w-100" onClick={resetFilters}>Reset filters</button>
        </div>
      </aside>

      <section className="col-lg-9">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h2 className="h5 mb-0">{data.total} Properties Found</h2>
          <div className="btn-group" role="group" aria-label="Grid and list view toggle">
            <button className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('grid')}>Grid</button>
            <button className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('list')}>List</button>
          </div>
        </div>

        <div className="mb-3 d-flex flex-wrap gap-2" aria-label="Active filters">
          {Object.entries(filters)
            .filter(([key, value]) => key !== 'amenities' && value && value !== 'all')
            .map(([key, value]) => (
              <span className="badge bg-info text-dark" key={key}>{key}: {value}</span>
            ))}
          {filters.amenities.map((amenity) => <span className="badge bg-success" key={amenity}>{amenity}</span>)}
        </div>

        <div className={viewMode === 'grid' ? 'row g-3' : 'd-grid gap-3'}>
          {data.data.map((property) => (
            <article key={property.id} className={viewMode === 'grid' ? 'col-md-6' : ''}>
              <div className={`card h-100 ${viewMode === 'list' ? 'flex-md-row' : ''}`}>
                <img src={property.image} className={viewMode === 'list' ? 'list-image' : 'card-img-top card-image'} alt={property.title} loading="lazy" />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary text-uppercase">{property.listingType}</span>
                    <span className="badge bg-secondary">{property.status}</span>
                  </div>
                  <h3 className="h6 mt-2">{property.title}</h3>
                  <p className="mb-1 fw-semibold">${property.price.toLocaleString()}</p>
                  <p className="small mb-1">{property.type} · {property.bedrooms} Beds · {property.bathrooms} Baths</p>
                  <p className="small text-muted">{property.location} · {property.distance}</p>
                  {property.featured && <span className="badge text-bg-warning me-2">Featured</span>}
                  {property.daysOnMarket < 7 && <span className="badge text-bg-success">New</span>}
                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    <Link className="btn btn-sm btn-outline-primary" to={`/property/${property.id}`}>Quick view</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(toggleWishlist(property.id))}>
                      {wishlist.includes(property.id) ? '♥ Saved' : '♡ Save'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => dispatch(toggleCompare(property.id))}
                      disabled={!compare.includes(property.id) && compare.length >= 3}
                    >
                      {compare.includes(property.id) ? '✓ Compare' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Listings;
