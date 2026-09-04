import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-6xl font-bold text-brand-700">404</h1>
      <p className="text-slate-600">We couldn&apos;t find the page you were looking for.</p>
      <Link href="/" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
        Back to home
      </Link>
    </div>
  );
}
