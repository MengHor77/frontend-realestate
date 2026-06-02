import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function formatPrice(property) {
  if (property.mode === 'Rent') {
    return `$${property.price.toLocaleString()}/mo`;
  }
  return `$${property.price.toLocaleString()}`;
}

function PropertyCard({ property, compact = false, onQuickView }) {
  const { state, toggleWishlist } = useAppContext();
  const saved = state.wishlist.includes(property.id);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative">
        <img loading="lazy" src={property.image} alt={property.title} className={`w-full object-cover ${compact ? 'h-40' : 'h-52'}`} />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">{property.mode}</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-semibold">{property.title}</h3>
          <button
            type="button"
            aria-label={`Add ${property.title} to wishlist`}
            onClick={() => toggleWishlist(property.id)}
            className={`rounded px-2 py-1 text-sm ${saved ? 'bg-pink-100 text-pink-600' : 'bg-slate-100 text-slate-600'}`}
          >
            ♥
          </button>
        </div>
        <p className="font-semibold text-blue-700">{formatPrice(property)}</p>
        <p className="text-sm text-slate-600">{property.type} • {property.beds} bd • {property.baths} ba • {property.size} sqft</p>
        <p className="text-sm text-slate-500">{property.location}</p>
        <div className="flex gap-2">
          <Link to={`/properties/${property.id}`} className="flex-1 rounded bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700">View details</Link>
          <button type="button" onClick={() => onQuickView?.(property)} className="rounded border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100">Quick view</button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
