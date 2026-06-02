import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import MapEmbed from '../../components/MapEmbed';
import PropertyCard from '../../components/PropertyCard';
import { useAppContext } from '../../context/AppContext';

function PropertyDetailPage() {
  const { id } = useParams();
  const { state } = useAppContext();
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
  const [lightbox, setLightbox] = useState(false);

  const property = state.properties.find((item) => String(item.id) === id);
  const similarProperties = useMemo(
    () => state.properties.filter((item) => item.id !== property?.id && item.type === property?.type).slice(0, 3),
    [property, state.properties],
  );

  if (!property) {
    return <p className="rounded-xl bg-white p-5">Property not found.</p>;
  }

  const gallery = [property.image, ...state.properties.filter((item) => item.id !== property.id).slice(0, 2).map((item) => item.image)];

  const onSubmit = () => {
    reset();
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-lg font-semibold text-blue-700">${property.price.toLocaleString()} {property.mode === 'Rent' ? '/ month' : ''}</p>
        <p className="text-slate-600">{property.location}</p>
      </section>

      <section>
        <button type="button" onClick={() => setLightbox(true)} className="block w-full overflow-hidden rounded-xl" aria-label="Open image gallery">
          <img src={property.image} alt={property.title} className="h-80 w-full object-cover" />
        </button>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {gallery.slice(1).map((image) => (
            <img key={image} src={image} loading="lazy" alt="Property gallery" className="h-32 w-full rounded-xl object-cover" />
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 p-4">
          <div className="w-full max-w-4xl">
            <img src={property.image} alt={property.title} className="max-h-[80vh] w-full rounded-xl object-contain" />
            <button type="button" className="mt-3 rounded bg-white px-4 py-2 text-sm font-semibold" onClick={() => setLightbox(false)}>Close lightbox</button>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <section className="space-y-6 rounded-xl bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2 text-slate-600">{property.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Specifications</h3>
            <ul className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <li>Type: {property.type}</li>
              <li>Size: {property.size} sqft</li>
              <li>Bedrooms: {property.beds}</li>
              <li>Bathrooms: {property.baths}</li>
              <li>Age: {property.age}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Features & Amenities</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {property.amenities.map((item) => <span key={item} className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-900">{item}</span>)}
            </div>
          </div>
          <MapEmbed title="Property location map" />
          <section>
            <h3 className="font-semibold">Reviews & Ratings</h3>
            <div className="mt-2 rounded-lg bg-slate-100 p-3 text-sm">⭐ {property.rating} / 5 based on recent buyer and renter feedback.</div>
          </section>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Agent Information</h3>
            <p className="mt-2 text-sm">Sokchea Realty Team</p>
            <p className="text-sm text-slate-600">Response time: under 30 min</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Share</button>
              <button type="button" className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">Email</button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Contact about this property</h3>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">Full Name</label>
              <input id="name" className="w-full rounded border border-slate-300 px-3 py-2" {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
              <input id="email" className="w-full rounded border border-slate-300 px-3 py-2" {...register('email', { required: 'Email is required' })} />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
              <textarea id="message" rows="4" className="w-full rounded border border-slate-300 px-3 py-2" {...register('message', { required: 'Message is required' })} />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>
            <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 font-semibold text-white">Send Inquiry</button>
            {isSubmitSuccessful && <p className="text-sm text-emerald-700">Inquiry submitted successfully.</p>}
          </form>
        </aside>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Similar Properties</h2>
          <Link to="/properties" className="text-sm font-semibold text-blue-700">Browse all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {similarProperties.map((item) => <PropertyCard key={item.id} property={item} compact />)}
        </div>
      </section>
    </div>
  );
}

export default PropertyDetailPage;
