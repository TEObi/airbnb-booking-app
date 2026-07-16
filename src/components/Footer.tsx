const footerLinks = [
  {
    heading: "Support",
    links: [
      { label: "Help Centre", href: "#" },
      { label: "AirCover", href: "#" },
      { label: "Anti-discrimination", href: "#" },
      { label: "Disability support", href: "#" },
      { label: "Cancellation options", href: "#" },
      { label: "Report neighbourhood concern", href: "#" },
    ],
  },
  {
    heading: "Hosting",
    links: [
      { label: "Airbnb your home", href: "/host/properties/new" },
      { label: "AirCover for Hosts", href: "#" },
      { label: "Hosting resources", href: "#" },
      { label: "Community forum", href: "#" },
      { label: "Hosting responsibly", href: "#" },
      { label: "Join a free Hosting class", href: "#" },
    ],
  },
  {
    heading: "Airbnb",
    links: [
      { label: "Newsroom", href: "#" },
      { label: "New features", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Gift cards", href: "#" },
      { label: "Airbnb.org emergency stays", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      {/* Main links */}
      <div className="mx-auto max-w-[2520px] px-4 sm:px-6 xl:px-20 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-[2520px] px-4 sm:px-6 xl:px-20 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {year} Airbnb Clone, Inc.
          </p>

          <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
            <a href="#" className="hover:underline hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <span aria-hidden="true">&middot;</span>
            <a href="#" className="hover:underline hover:text-gray-900 transition-colors">
              Terms
            </a>
            <span aria-hidden="true">&middot;</span>
            <a href="#" className="hover:underline hover:text-gray-900 transition-colors">
              Sitemap
            </a>
            <span aria-hidden="true">&middot;</span>
            <a href="#" className="hover:underline hover:text-gray-900 transition-colors">
              Company details
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              English (US)
            </button>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
            >
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
