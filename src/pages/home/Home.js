import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';
import { useAppContext } from '../../context/AppContext';

const quickFilters = ['Buy', 'Rent', 'New Listings'];

function Home() {
  const navigate = useNavigate();
  const { state, setFilters } = useAppContext();
  const featured = state.properties.slice(0, 3);

  const submitSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFilters({
      query: formData.get('query') || '',
      maxPrice: Number(formData.get('maxPrice')) || state.filters.maxPrice,
      propertyType: formData.get('propertyType') || 'Any',
    });
    navigate('/search');
  };

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-emerald-600 p-6 text-white md:p-10">
        <h1 className="text-3xl font-bold md:text-5xl">Find your next home with confidence</h1>
        <p className="mt-3 max-w-2xl text-blue-50">Search curated listings across Cambodia with powerful filters, map discovery, and trusted agents.</p>
        <form onSubmit={submitSearch} className="mt-6 grid gap-3 rounded-xl bg-white/95 p-4 text-slate-900 md:grid-cols-4">
          <label className="sr-only" htmlFor="hero-query">Location or property</label>
          <input id="hero-query" name="query" placeholder="Search location" className="rounded border border-slate-300 px-3 py-2" />
          <label className="sr-only" htmlFor="hero-price">Max price</label>
          <input id="hero-price" name="maxPrice" type="number" min="0" placeholder="Max price" className="rounded border border-slate-300 px-3 py-2" />
          <label className="sr-only" htmlFor="hero-type">Property type</label>
          <select id="hero-type" name="propertyType" className="rounded border border-slate-300 px-3 py-2">
            <option value="Any">Any type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
          </select>
          <button type="submit" className="rounded bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700">Search Properties</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-white/40 px-4 py-1 text-sm hover:bg-white hover:text-blue-700"
              onClick={() => {
                setFilters(filter === 'New Listings' ? { sort: 'newest' } : { query: '', propertyType: 'Any' });
                if (filter === 'Buy' || filter === 'Rent') {
                  setFilters({ query: '', propertyType: 'Any', minPrice: 0, maxPrice: 500000 });
                }
                navigate('/properties');
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Properties</h2>
          <Link to="/properties" className="text-sm font-semibold text-blue-700">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((property) => <PropertyCard key={property.id} property={property} compact />)}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['1,200+', 'Active listings'],
          ['95%', 'Client satisfaction'],
          ['250+', 'Verified agents'],
          ['40+', 'Neighborhoods covered'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-3xl font-bold text-emerald-600">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-semibold">List your property</h2>
          <p className="mt-2 text-sm text-slate-300">Reach qualified buyers and renters with premium placement.</p>
          <Link to="/agent/dashboard" className="mt-4 inline-block rounded bg-emerald-500 px-4 py-2 font-semibold text-slate-900">Get Started</Link>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-6">
          <h2 className="text-xl font-semibold text-emerald-900">Need expert help?</h2>
          <p className="mt-2 text-sm text-emerald-900">Talk to our local agents and schedule private viewings today.</p>
          <Link to="/account/dashboard" className="mt-4 inline-block rounded bg-emerald-700 px-4 py-2 font-semibold text-white">Contact an Agent</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
