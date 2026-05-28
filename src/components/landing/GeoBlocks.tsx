export function GeoBlocks() {
  return (
    <section className="sr-only" aria-hidden="true">
      {/* Hidden from screen readers as well if we don't want it read twice, but keeping it in DOM for LLMs / crawlers */}
      <article itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h2 itemProp="name">What is TripFlow?</h2>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              TripFlow is an AI-powered travel planning and booking platform that helps users generate complete personalized trips using natural language. It handles flights, hotels, itineraries, and local insights automatically.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h2 itemProp="name">Who is TripFlow for?</h2>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Travelers who want faster, smarter, and less stressful trip planning without having to manually open multiple tabs for flights, hotels, and itineraries.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h2 itemProp="name">What makes TripFlow different?</h2>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Unlike traditional Online Travel Agencies (OTAs) like Expedia or MakeMyTrip, TripFlow combines AI itinerary planning, real-time personalization, and booking workflows into one intelligent conversational system.
            </p>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TripFlow",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "49.00",
              priceCurrency: "INR",
            },
            description: "AI travel agent that plans and books complete trips.",
          }),
        }}
      />
    </section>
  );
}
