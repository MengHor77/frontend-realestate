function MapEmbed({ title }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200" role="region" aria-label={title}>
      <iframe
        title={title}
        src="https://maps.google.com/maps?q=Phnom%20Penh&t=&z=12&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapEmbed;
