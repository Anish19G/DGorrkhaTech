import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
              DG
            </span>
            DGorkhaTech
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            We digitalize businesses — IT consulting, software, web, mobile, and data, delivered by
            one accountable team.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">Our Work</Link></li>
            <li><Link href="/blog" className="hover:text-white">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services/it-consulting" className="hover:text-white">IT Consulting</Link></li>
            <li><Link href="/services/software-development" className="hover:text-white">Software Development</Link></li>
            <li><Link href="/services/web-development" className="hover:text-white">Web Development</Link></li>
            <li><Link href="/services/data-analytics" className="hover:text-white">Data & Analytics</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@dgorkhatech.com</li>
            <li>+61414040275</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DGorkhaTech. All rights reserved.
      </div>
    </footer>
  );
}
