import { useState } from 'react';
import MapEmbed from '../../components/MapEmbed';
import PropertyCard from '../../components/PropertyCard';
import { useAppContext } from '../../context/AppContext';

function SearchResultsPage() {
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [searchName, setSearchName] = useState('');
  const { filteredProperties, state, saveSearch } = useAppContext();

  const onSaveSearch = () => {
    if (searchName.trim()) {
      saveSearch(searchName.trim());
      setSearchName('');
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Search & Filter Results</h1>
      <section className="grid gap-4 lg:grid-cols-2">
        <MapEmbed title="Search results map with property pins" />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Save this search</h2>
          <p className="mt-1 text-sm text-slate-600">Store filters and receive matching property alerts by email.</p>
          <div className="mt-3 flex gap-2">
            <input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="e.g. BKK1 apartments" className="flex-1 rounded border border-slate-300 px-3 py-2" />
            <button type="button" onClick={onSaveSearch} className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Save Search</button>
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={alertEnabled} onChange={(e) => setAlertEnabled(e.target.checked)} />
            Enable email alerts
          </label>
          <p className="mt-2 text-xs text-slate-500">Saved searches: {state.savedSearches.length}</p>
          <p className="mt-1 text-xs text-slate-500">{alertEnabled ? 'Email alerts are active for new matches.' : 'Enable alerts to receive matching listings.'}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} compact />
        ))}
      </section>
    </div>
  );
}

export default SearchResultsPage;
