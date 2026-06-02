import { useForm } from 'react-hook-form';

function AgentDashboard() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => reset();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agent / Seller Dashboard</h1>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Property Views', '18,240'],
          ['Inquiries', '322'],
          ['Contact Requests', '74'],
        ].map(([label, value]) => (
          <article key={label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-blue-700">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Manage Listings</h2>
        <p className="mt-2 text-sm text-slate-600">Add, edit, and remove properties from your portfolio.</p>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Property title" className="rounded border border-slate-300 px-3 py-2" {...register('title', { required: true })} />
          <input placeholder="Price" type="number" className="rounded border border-slate-300 px-3 py-2" {...register('price', { required: true })} />
          <select className="rounded border border-slate-300 px-3 py-2" {...register('type')}>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
          </select>
          <input type="file" aria-label="Upload photos and documents" className="rounded border border-slate-300 px-3 py-2" {...register('docs')} />
          <button type="submit" className="md:col-span-2 rounded bg-slate-900 px-4 py-2 font-semibold text-white">Add listing</button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Inquiry and Lead Management</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            <li>5 new buyer leads today</li>
            <li>2 pending follow-ups for penthouse listing</li>
          </ul>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Payment / Commission Tracking</h2>
          <p className="mt-2 text-sm text-slate-600">Current month commission: $3,950</p>
        </article>
      </section>
    </div>
  );
}

export default AgentDashboard;
