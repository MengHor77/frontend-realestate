import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  return (
    <section className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(() => {})} className="mt-4 space-y-3" noValidate>
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="login-email" type="email" className="w-full rounded border border-slate-300 px-3 py-2" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium">Password</label>
          <input id="login-password" type="password" className="w-full rounded border border-slate-300 px-3 py-2" {...register('password', { required: 'Password is required' })} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full rounded bg-slate-900 px-4 py-2 font-semibold text-white">Sign in</button>
      </form>
      {isSubmitSuccessful && <p className="mt-2 text-sm text-emerald-700">Logged in successfully.</p>}
      <p className="mt-4 text-sm">New here? <Link to="/auth/signup" className="font-semibold text-blue-700">Create account</Link></p>
    </section>
  );
}

export default LoginPage;
