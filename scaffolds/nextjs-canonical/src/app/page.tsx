export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Canonical Next.js Site
      </h1>
      <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground">
        Production-ready scaffold with Next.js 16, React 19, Tailwind 4, shadcn/ui,
        and quality tooling pre-wired.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Get Started
        </a>
        <a
          href="/docs"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          Documentation
        </a>
      </div>
    </main>
  );
}
