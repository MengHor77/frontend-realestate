import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  return (
    <section className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={handleSubmit(() => {})} className="mt-4 grid gap-3 sm:grid-cols-2" noValidate>
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium">First name</label>
          <input id="firstName" className="w-full rounded border border-slate-300 px-3 py-2" {...register('firstName', { required: 'Required' })} />
          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium">Last name</label>
          <input id="lastName" className="w-full rounded border border-slate-300 px-3 py-2" {...register('lastName', { required: 'Required' })} />
          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="signup-email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="signup-email" type="email" className="w-full rounded border border-slate-300 px-3 py-2" {...register('email', { required: 'Required' })} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="role" className="mb-1 block text-sm font-medium">Account type</label>
          <select id="role" className="w-full rounded border border-slate-300 px-3 py-2" {...register('role')}>
            <option value="buyer">Buyer/Renter</option>
            <option value="agent">Agent/Seller</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="signup-password" className="mb-1 block text-sm font-medium">Password</label>
          <input id="signup-password" type="password" className="w-full rounded border border-slate-300 px-3 py-2" {...register('password', { required: 'Required', minLength: 6 })} />
          {errors.password && <p className="text-sm text-red-600">Minimum 6 characters.</p>}
        </div>
        <button type="submit" className="sm:col-span-2 rounded bg-emerald-600 px-4 py-2 font-semibold text-white">Sign up</button>
      </form>
      {isSubmitSuccessful && <p className="mt-2 text-sm text-emerald-700">Account created successfully.</p>}
      <p className="mt-4 text-sm">Already have an account? <Link to="/auth/login" className="font-semibold text-blue-700">Login</Link></p>
    </section>
  );
}

export default SignupPage;
