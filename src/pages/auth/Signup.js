import React from 'react';
import { useForm } from 'react-hook-form';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  return (
    <section className="row justify-content-center">
      <div className="col-md-7 col-lg-6">
        <h1 className="h4 mb-3">Create account</h1>
        <form className="card card-body" onSubmit={handleSubmit(() => true)} noValidate>
          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label">First name</label>
              <input className="form-control" {...register('firstName', { required: 'Required' })} />
              {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Last name</label>
              <input className="form-control" {...register('lastName', { required: 'Required' })} />
              {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
            </div>
          </div>

          <label className="form-label mt-2">Email</label>
          <input className="form-control" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}

          <label className="form-label mt-2">Password</label>
          <input className="form-control" type="password" {...register('password', { required: 'Password is required', minLength: 6 })} />

          <label className="form-label mt-2">User type</label>
          <select className="form-select" {...register('userType')}>
            <option>Buyer</option>
            <option>Seller</option>
            <option>Agent</option>
          </select>

          <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="terms" {...register('terms', { required: true })} />
            <label className="form-check-label" htmlFor="terms">I accept terms and privacy policy</label>
          </div>
          {errors.terms && <small className="text-danger">You must accept terms.</small>}

          <button type="submit" className="btn btn-success mt-3">Register</button>
          {isSubmitSuccessful && <p className="small text-success mt-2">Account created. Verification email sent.</p>}
        </form>
      </div>
    </section>
  );
}

export default Signup;
