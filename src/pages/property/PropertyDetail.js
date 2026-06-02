import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchPropertyById, fetchProperties } from '../../services/mockApi';
import { addRecentlyViewed } from '../../store/slices/uiSlice';

function PropertyDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const { data: property, isLoading, isError } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id)
  });

  useEffect(() => {
    if (property) {
      dispatch(addRecentlyViewed({ id: property.id, title: property.title }));
    }
  }, [dispatch, property]);

  const { data: similar = { data: [] } } = useQuery({
    queryKey: ['similar-properties', id],
    queryFn: () => fetchProperties({ sort: 'featured' })
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const onSubmit = () => true;

  if (isLoading) return <p aria-busy="true">Loading property details...</p>;
  if (isError || !property) return <p role="alert">Property not found.</p>;

  const activeImageUrl = property.images[activeImage] || property.image;

  return (
    <div className="d-grid gap-4">
      <section className="row g-4">
        <div className="col-lg-8">
          <div className="position-relative">
            <img src={activeImageUrl} alt={property.title} className="w-100 rounded detail-main-image" loading="lazy" />
            <button className="btn btn-dark btn-sm position-absolute top-0 end-0 m-2" onClick={() => setShowLightbox(true)}>
              Full screen
            </button>
            <span className="badge bg-dark position-absolute bottom-0 end-0 m-2">
              {activeImage + 1} / {property.images.length}
            </span>
          </div>
          <div className="d-flex gap-2 mt-2 overflow-auto" aria-label="Image thumbnails">
            {property.images.map((img, index) => (
              <button key={img} className="border-0 bg-transparent p-0" onClick={() => setActiveImage(index)}>
                <img src={img} alt={`${property.title} ${index + 1}`} className="thumb-image rounded" loading="lazy" />
              </button>
            ))}
          </div>

          <h1 className="h3 mt-3">{property.title}</h1>
          <p className="lead mb-1">${property.price.toLocaleString()}</p>
          <p className="text-muted">{property.location}</p>
          <p>{property.description}</p>

          <div className="row row-cols-2 row-cols-md-4 g-2 mb-3">
            <div className="key-detail">Beds: {property.bedrooms}</div>
            <div className="key-detail">Baths: {property.bathrooms}</div>
            <div className="key-detail">Size: {property.size} sqft</div>
            <div className="key-detail">Type: {property.type}</div>
            <div className="key-detail">Age: {property.yearBuilt ? new Date().getFullYear() - property.yearBuilt : 'N/A'}</div>
            <div className="key-detail">Furnished: {property.furnished}</div>
            <div className="key-detail">Status: {property.status}</div>
            <div className="key-detail">Floor plan: {property.floorPlan}</div>
          </div>

          <h2 className="h5">Features & amenities</h2>
          <ul className="list-inline">
            {property.amenities.map((amenity) => (
              <li key={amenity} className="list-inline-item badge text-bg-light border me-2 mb-2">{amenity}</li>
            ))}
          </ul>

          <h2 className="h5 mt-3">Location map</h2>
          <iframe
            title="Property location map"
            className="w-100 rounded border"
            height="240"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&z=14&output=embed`}
          />
        </div>

        <aside className="col-lg-4 d-grid gap-3">
          <div className="card">
            <div className="card-body">
              <h2 className="h6">Agent details</h2>
              <div className="d-flex gap-3 align-items-center mb-2">
                <img src={property.agent.avatar} alt={property.agent.name} className="agent-avatar rounded-circle" loading="lazy" />
                <div>
                  <p className="mb-0 fw-semibold">{property.agent.name}</p>
                  <p className="mb-0 small">{property.agent.title} · ⭐ {property.agent.rating}</p>
                </div>
              </div>
              <p className="mb-1">📞 {property.agent.phone}</p>
              <p className="mb-2">✉️ {property.agent.email}</p>
              <div className="d-flex gap-2">
                <a href={`tel:${property.agent.phone}`} className="btn btn-sm btn-outline-primary">Call</a>
                <a href={`mailto:${property.agent.email}`} className="btn btn-sm btn-outline-success">Email</a>
                <button type="button" className="btn btn-sm btn-outline-secondary">Message</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="h6">Inquiry form</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <input className="form-control mb-2" placeholder="Name" {...register('name', { required: 'Name is required' })} aria-invalid={errors.name ? 'true' : 'false'} />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                <input className="form-control my-2" type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} aria-invalid={errors.email ? 'true' : 'false'} />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                <input className="form-control my-2" placeholder="Phone" {...register('phone', { required: 'Phone is required' })} />
                <textarea className="form-control my-2" rows="3" placeholder="Message" {...register('message', { required: true })} />
                <div className="row g-2">
                  <div className="col-6"><input className="form-control" type="date" {...register('date')} /></div>
                  <div className="col-6"><input className="form-control" type="time" {...register('time')} /></div>
                </div>
                <div className="form-check my-2">
                  <input className="form-check-input" id="captcha" type="checkbox" {...register('captcha', { required: true })} />
                  <label className="form-check-label" htmlFor="captcha">I am not a robot</label>
                </div>
                {errors.captcha && <small className="text-danger">Captcha verification is required.</small>}
                <button className="btn btn-primary w-100 mt-2" type="submit">Send inquiry</button>
                {isSubmitSuccessful && <p className="text-success small mt-2 mb-0">Inquiry submitted successfully.</p>}
              </form>
            </div>
          </div>

          <div className="card"><div className="card-body"><h2 className="h6">Quick facts</h2><ul className="mb-0 small"><li>Taxes: ${property.taxes}/mo</li><li>HOA: ${property.hoaFees}/mo</li><li>Days on market: {property.daysOnMarket}</li></ul></div></div>
          <div className="card"><div className="card-body"><h2 className="h6">Share</h2><div className="d-flex flex-wrap gap-2"><button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link</button><button type="button" className="btn btn-sm btn-outline-secondary">Facebook</button><button type="button" className="btn btn-sm btn-outline-secondary">Twitter</button><button type="button" className="btn btn-sm btn-outline-secondary">LinkedIn</button><button type="button" className="btn btn-sm btn-outline-secondary">WhatsApp</button></div></div></div>
        </aside>
      </section>

      <section>
        <h2 className="h5">Similar properties</h2>
        <div className="row g-3">
          {similar.data
            .filter((item) => item.id !== property.id)
            .slice(0, 4)
            .map((item) => (
              <div className="col-md-3" key={item.id}>
                <div className="card h-100">
                  <img src={item.image} className="card-img-top card-image" alt={item.title} loading="lazy" />
                  <div className="card-body">
                    <p className="small mb-1">{item.title}</p>
                    <Link to={`/property/${item.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {showLightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery lightbox">
          <button className="btn btn-light btn-sm lightbox-close" onClick={() => setShowLightbox(false)}>Close</button>
          <button className="btn btn-light btn-sm lightbox-prev" onClick={() => setActiveImage((value) => (value === 0 ? property.images.length - 1 : value - 1))}>Prev</button>
          <img src={activeImageUrl} alt={property.title} className="lightbox-image" />
          <button className="btn btn-light btn-sm lightbox-next" onClick={() => setActiveImage((value) => (value === property.images.length - 1 ? 0 : value + 1))}>Next</button>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
