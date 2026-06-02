import { useAppContext } from '../../context/AppContext';

function UserDashboard() {
  const { state } = useAppContext();
  const savedProperties = state.properties.filter((property) => state.wishlist.includes(property.id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Saved Properties / Wishlist</h2>
          {savedProperties.length === 0
            ? <p className="mt-2 text-sm text-slate-600">No saved properties yet.</p>
            : <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">{savedProperties.map((item) => <li key={item.id}>{item.title}</li>)}</ul>}
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Inquiry History</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            <li>Riverside Villa - inquiry sent yesterday</li>
            <li>Townhouse Tour - scheduled for Friday</li>
          </ul>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Account Settings</h2>
          <p className="mt-2 text-sm text-slate-600">Manage profile info, notifications and password.</p>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Document Uploads</h2>
          <input type="file" className="mt-3 block w-full text-sm" aria-label="Upload account document" />
        </article>
      </section>
    </div>
  );
}

export default UserDashboard;
