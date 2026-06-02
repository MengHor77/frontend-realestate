import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchHomeData } from '../../services/mockApi';
import { addSearchHistory } from '../../store/slices/uiSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: '',
      listingType: 'all',
      maxPrice: ''
    }
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-data'],
    queryFn: fetchHomeData
  });

  const onSubmit = (values) => {
    dispatch(addSearchHistory(values.location));
    const params = new URLSearchParams({
      location: values.location || '',
      listingType: values.listingType || 'all',
      maxPrice: values.maxPrice || ''
    });
    navigate(`/listings?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="placeholder-glow" aria-busy="true"><span className="placeholder col-12" /></div>;
  }

  if (isError) {
    return <p role="alert">Failed to load homepage data.</p>;
  }

  return (
    <div className="d-grid gap-4">
      <section className="p-4 p-md-5 rounded bg-primary text-white">
        <h1 className="display-6 fw-bold">Discover your next property</h1>
        <p>Search by location, budget, and property type across sale and rent listings.</p>
        <form className="row g-2" onSubmit={handleSubmit(onSubmit)} aria-label="Property search form">
          <div className="col-md-4">
            <label className="visually-hidden" htmlFor="location-search">Location</label>
            <input id="location-search" className="form-control" placeholder="City or neighborhood" {...register('location')} />
          </div>
          <div className="col-md-3">
            <label className="visually-hidden" htmlFor="listingType">Listing type</label>
            <select id="listingType" className="form-select" {...register('listingType')}>
              <option value="all">Buy / Rent</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="visually-hidden" htmlFor="maxPrice">Max price</label>
            <input id="maxPrice" type="number" className="form-control" placeholder="Max price" {...register('maxPrice')} />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-success" type="submit">Search</button>
          </div>
        </form>

        <div className="d-flex gap-2 mt-3 flex-wrap" aria-label="Quick filters">
          <Link to="/listings?listingType=buy" className="btn btn-outline-light btn-sm">Buy</Link>
          <Link to="/listings?listingType=rent" className="btn btn-outline-light btn-sm">Rent</Link>
          <Link to="/listings?sort=newest" className="btn btn-outline-light btn-sm">New Listings</Link>
        </div>
      </section>

      <section>
        <h2 className="h4 mb-3">Featured properties</h2>
        <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel" aria-label="Featured properties carousel">
          <div className="carousel-inner rounded">
            {data.featured.map((property, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={property.id}>
                <img src={property.image} className="d-block w-100 home-carousel-image" loading="lazy" alt={property.title} />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                  <h3 className="h5 mb-1">{property.title}</h3>
                  <p className="mb-0">${property.price.toLocaleString()} · {property.location}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="row text-center g-3">
        <div className="col-md-4"><div className="stat-card"><h3 className="h2">{data.stats.totalProperties}</h3><p>Total Properties</p></div></div>
        <div className="col-md-4"><div className="stat-card"><h3 className="h2">{data.stats.activeAgents}</h3><p>Active Agents</p></div></div>
        <div className="col-md-4"><div className="stat-card"><h3 className="h2">{data.stats.happyCustomers}</h3><p>Happy Customers</p></div></div>
      </section>

      <section>
        <h2 className="h4 mb-3">Client testimonials</h2>
        <div className="row g-3">
          {data.testimonials.map((item) => (
            <article className="col-md-4" key={item.id}>
              <div className="card h-100"><div className="card-body"><p>“{item.feedback}”</p><p className="fw-semibold mb-0">— {item.name}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="row g-3">
        <div className="col-md-6"><div className="cta-box"><h2 className="h5">List your property</h2><p>Reach thousands of buyers and renters with detailed listing tools.</p><Link className="btn btn-primary" to="/agent-dashboard">Start listing</Link></div></div>
        <div className="col-md-6"><div className="cta-box"><h2 className="h5">Talk to an expert agent</h2><p>Need help deciding? Connect with our top-rated specialists.</p><Link className="btn btn-success" to="/contact-us">Contact agent</Link></div></div>
      </section>
    </div>
  );
}

export default Home;
