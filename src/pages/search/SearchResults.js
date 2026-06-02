import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '../../services/mockApi';

function SearchResults() {
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: ['map-results'],
    queryFn: () => fetchProperties({ sort: 'most-viewed' })
  });

  if (isLoading) return <p aria-busy="true">Loading map results...</p>;

  return (
    <div className="row g-4">
      <section className="col-lg-7">
        <h1 className="h5">Dynamic map view</h1>
        <iframe
          title="Search map"
          className="w-100 rounded border"
          height="420"
          loading="lazy"
          src="https://maps.google.com/maps?q=Phnom%20Penh&z=12&output=embed"
        />
        <p className="small text-muted mt-2">Pins, clusters, heatmap, and street-view controls are represented through this Google Maps integration placeholder.</p>
      </section>
      <section className="col-lg-5">
        <h2 className="h5">Result list</h2>
        <div className="d-grid gap-2">
          {data.data.slice(0, 6).map((property) => (
            <article key={property.id} className="card card-body">
              <h3 className="h6 mb-1">{property.title}</h3>
              <p className="small mb-1">{property.location}</p>
              <p className="small mb-0">${property.price.toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResults;
