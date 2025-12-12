const areas = [
  { name: 'Houston', description: 'Central Houston and surrounding neighborhoods' },
  { name: 'Missouri City', description: 'Fort Bend County communities' },
  { name: 'Spring', description: 'North Houston area' },
  { name: 'Katy', description: 'West Houston suburbs' },
  { name: 'Sugar Land', description: 'Southwest Houston area' },
  { name: 'Pearland', description: 'South Houston communities' },
];

export function AreasServed() {
  return (
    <section className="py-20 lg:py-28 bg-neutral-50">
      <div className="container">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-secondary"></div>
          <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Service Areas</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
            Areas We Serve
          </h2>
          <p className="text-neutral-600 max-w-md text-lg">
            Proudly serving the Greater Houston area with reliable HVAC services. Same-day service available in most locations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {areas.map((area) => (
            <div
              key={area.name}
              className="text-center p-6 rounded-2xl bg-white hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-hero-start to-hero-end text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-black mb-1">{area.name}</h3>
              <p className="text-sm text-neutral-500">{area.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-600">
            Don't see your area? Call us at{' '}
            <a href="tel:+18324371000" className="text-secondary font-semibold hover:underline">
              (832) 437-1000
            </a>{' '}
            to check availability.
          </p>
        </div>
      </div>
    </section>
  );
}
