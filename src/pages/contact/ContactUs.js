import React from 'react';
import { useForm } from 'react-hook-form';

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful }
  } = useForm();

  return (
    <section className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <h1 className="h4 mb-3">Contact agents</h1>
        <form className="card card-body" onSubmit={handleSubmit(() => true)}>
          <input className="form-control mb-2" placeholder="Full name" {...register('name')} />
          <input className="form-control mb-2" type="email" placeholder="Email" {...register('email')} />
          <textarea className="form-control mb-2" rows="4" placeholder="How can we help?" {...register('message')} />
          <button type="submit" className="btn btn-primary">Send message</button>
          {isSubmitSuccessful && <p className="small text-success mt-2">Thanks, we will contact you shortly.</p>}
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
