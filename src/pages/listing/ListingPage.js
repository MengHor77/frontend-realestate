import { useState } from 'react';
import FilterSidebar from '../../components/FilterSidebar';
import PropertyCard from '../../components/PropertyCard';
import { useAppContext } from '../../context/AppContext';

function ListingPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [quickView, setQuickView] = useState(null);
  const { filteredProperties } = useAppContext();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <div className="rounded-lg border border-slate-300 p-1">
          <button type="button" onClick={() => setViewMode('grid')} className={`rounded px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-slate-900 text-white' : ''}`}>Grid</button>
          <button type="button" onClick={() => setViewMode('list')} className={`rounded px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-slate-900 text-white' : ''}`}>List</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
        <FilterSidebar />
        <section className={`grid gap-4 ${viewMode === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`} aria-live="polite">
          {filteredProperties.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-slate-600">No properties match your filters.</p>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                compact={viewMode === 'grid'}
                onQuickView={setQuickView}
              />
            ))
          )}
        </section>
      </div>

      {quickView && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
            <h2 className="text-xl font-semibold">{quickView.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{quickView.description}</p>
            <p className="mt-2 text-sm">{quickView.location}</p>
            <button type="button" onClick={() => setQuickView(null)} className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Close quick view</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingPage;
