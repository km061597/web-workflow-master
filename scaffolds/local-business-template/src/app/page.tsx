export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-24 text-center text-primary-foreground">
        <h1 className="text-5xl font-bold">Business Name</h1>
        <p className="mt-4 text-xl">Tagline: what you do and who you serve</p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary"
        >
          Book Now / Get a Quote
        </a>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-4 text-lg text-secondary">
          Replace with your business story, mission, and what makes you different.
        </p>
      </section>

      {/* Services */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Services</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Service 1</h3>
              <p className="mt-2 text-secondary">Description</p>
              <p className="mt-2 font-bold text-primary">Price</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Service 2</h3>
              <p className="mt-2 text-secondary">Description</p>
              <p className="mt-2 font-bold text-primary">Price</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Service 3</h3>
              <p className="mt-2 text-secondary">Description</p>
              <p className="mt-2 font-bold text-primary">Price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-bold">What Customers Say</h2>
        <blockquote className="mt-8 rounded-xl bg-accent p-6">
          <p className="text-lg italic">&ldquo;Customer testimonial&rdquo;</p>
          <footer className="mt-4 font-semibold">Customer Name</footer>
        </blockquote>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary py-16 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <p className="mt-4 text-lg">Phone · Email · Address</p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary"
        >
          Contact Us
        </a>
      </section>

      {/* Map Embed */}
      <section className="h-96 w-full">
        <iframe
          src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "about:blank"}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Business location"
        />
      </section>
    </main>
  );
}
