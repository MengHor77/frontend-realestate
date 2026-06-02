function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 px-4 py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-white">HomeHaven</h2>
          <p className="mt-2 text-sm">Modern real estate experiences for buyers, renters, and agents.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Buy Properties</li>
            <li>Rent Homes</li>
            <li>Contact Agents</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="mt-2 text-sm">support@homehaven.com</p>
          <p className="text-sm">+855 12 345 678</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
