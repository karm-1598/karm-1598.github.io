import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
          404
        </p>
        <h1 className="text-5xl font-medium tracking-[-0.06em] md:text-7xl">
          Page not found.
        </h1>
        <p className="mt-6 text-base leading-7 text-white/50">
          The page you&apos;re looking for has moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white hover:text-black"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
