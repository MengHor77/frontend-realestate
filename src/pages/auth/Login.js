import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  return (
    <section className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <h1 className="h4 mb-3">Login</h1>
        <form className="card card-body" onSubmit={handleSubmit(() => true)} noValidate>
          <label className="form-label">Email</label>
          <input className="form-control" type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}

          <label className="form-label mt-2">Password</label>
          <input className="form-control" type="password" {...register('password', { required: 'Password is required' })} />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}

          <div className="form-check mt-2">
            <input className="form-check-input" id="remember" type="checkbox" {...register('remember')} />
            <label className="form-check-label" htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary mt-3">Sign in</button>
          {isSubmitSuccessful && <p className="small text-success mt-2">Logged in successfully.</p>}
        </form>
        <div className="d-flex justify-content-between mt-3">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/signup">Create account</Link>
        </div>
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-outline-secondary btn-sm" type="button">Continue with Google</button>
          <button className="btn btn-outline-secondary btn-sm" type="button">Continue with Facebook</button>
        </div>
      </div>
    </section>
  );
}

export default Login;
