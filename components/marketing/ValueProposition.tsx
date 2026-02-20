'use client';

const VALUE_PROPS = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On Time, As Ordered',
    description: 'On-time delivery guaranteed or your next order is on us. We take punctuality seriously so your event starts without a hitch.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Curated Menu Variety',
    description: '80+ items across breakfast, lunch, and dessert. From Southern comfort classics to plant-based options for every palate.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Dedicated Support',
    description: 'Our team is here to help — call (312) 600-8155, email orders@souldelivered.com, or text us anytime.',
  },
];

export default function ValueProposition() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {VALUE_PROPS.map((prop, index) => (
            <div
              key={index}
              className="text-center px-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dabb64]/20 text-[#363333] mb-4">
                {prop.icon}
              </div>
              <h3 className="font-oswald text-xl font-bold text-[#363333] mb-2 tracking-wide">
                {prop.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
