import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Instagram, Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappUrl, type Project } from "@/data/projects";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

/* ---------- Buttons ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";
export const btn = {
  primary: cn(btnBase, "bg-primary text-primary-foreground hover:bg-foreground"),
  outline: cn(btnBase, "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"),
  ghostLight: cn(btnBase, "border border-background/70 text-background hover:bg-background hover:text-foreground"),
};

export function TextLink({ to, children, light }: { to: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 border-b pb-1 text-sm font-medium transition-colors",
        light ? "border-background/60 text-background" : "border-foreground/40 text-foreground hover:border-primary hover:text-primary",
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 stroke-[1.25] transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-caps text-primary", className)}>{children}</p>;
}

/* ---------- Header ---------- */
export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" || /^\/portfolio\/.+/.test(pathname);
  const solid = scrolled || !overHero || open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "border-b border-border bg-background/95 text-foreground backdrop-blur" : "border-b border-transparent text-background",
      )}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col leading-none" aria-label="Arkana Studio home">
          <span className="font-serif text-3xl">Arkana</span>
          <span className="label-caps mt-0.5 text-[0.6rem] opacity-80">Studio</span>
        </Link>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm tracking-wide opacity-85 transition-opacity hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:underline data-[status=active]:underline-offset-8"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={cn(
              "rounded-sm border px-5 py-2.5 text-sm transition-colors",
              solid ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground" : "border-background/70 hover:bg-background hover:text-foreground",
            )}
          >
            Consultation
          </Link>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-6 w-6 stroke-[1.25]" /> : <Menu className="h-6 w-6 stroke-[1.25]" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-20 flex flex-col justify-between bg-background px-6 pb-10 pt-8 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="font-serif text-4xl data-[status=active]:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={cn(btn.primary, "w-full bg-sage")}>
            <MessageCircle className="h-5 w-5 stroke-[1.5]" /> Chat via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Floating WhatsApp ---------- */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-sage-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6 stroke-[1.5]" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-sm bg-foreground px-3 py-1.5 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="border-t border-border bg-sand">
      <div className="container-site grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-3xl leading-none">Arkana</p>
          <p className="label-caps mt-1 text-[0.6rem]">Studio</p>
          <p className="mt-6 font-serif text-xl italic">Designing Homes, Keeping Stories</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An architecture and interior studio based in Bandung. We design warm, personal homes for families in Bandung and Greater Jakarta.
          </p>
        </div>
        <FooterCol title="Navigate">
          {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
        </FooterCol>
        <FooterCol title="Services">
          {["Residential Design", "Interior Design", "Working Drawings & Cost Estimates", "Supervision"].map((s) => (
            <li key={s}><Link to="/services" className="hover:text-primary">{s}</Link></li>
          ))}
        </FooterCol>
        <FooterCol title="Contact">
          <li>Jl. Ciumbuleuit No. 88, Bandung</li>
          <li><a href={whatsappUrl()} className="hover:text-primary">+62 812-0000-0000</a></li>
          <li><a href="mailto:halo@arkanastudio.id" className="hover:text-primary">halo@arkanastudio.id</a></li>
          <li>Mon–Sat, 09:00–17:00 WIB</li>
          <li className="flex gap-4 pt-2">
            <a href="https://instagram.com/arkanastudio" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5 stroke-[1.25]" /></a>
            <a href="https://pinterest.com" aria-label="Pinterest" className="hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25"><circle cx="12" cy="12" r="9.5" /><path d="M10.5 20.5 12 14m0 0c-.7-1.5-.3-4 1.6-4 2.6 0 2.4 3.5 1 5-1.2 1.3-2.6.7-2.6-1Z" /></svg>
            </a>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Arkana Studio. All rights reserved. · <a href="#" className="underline-offset-4 hover:underline">Privacy Policy</a></p>
          <p>This website is a demonstration project. All content is fictional.</p>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="label-caps mb-5 text-muted-foreground">{title}</p>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

/* ---------- Page header ---------- */
export function PageHeader({ crumb, title, intro }: { crumb: string; title: string; intro: string }) {
  return (
    <section className="container-site pb-16 pt-36 md:pb-20 md:pt-44">
      <nav aria-label="Breadcrumb" className="label-caps text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-2">/</span> <span className="text-foreground">{crumb}</span>
      </nav>
      <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
    </section>
  );
}

/* ---------- Project card ---------- */
export function ProjectCard({ p, className, aspect = "aspect-[4/5]" }: { p: Project; className?: string; aspect?: string }) {
  return (
    <Link to="/portfolio/$slug" params={{ slug: p.slug }} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden bg-sand", aspect)}>
        <img src={p.image} alt={`${p.name}, ${p.style} ${p.category.toLowerCase()} project in ${p.location}`} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end bg-overlay p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="label-caps text-background">View Project →</span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.location} · {p.year}</p>
        </div>
        <span className="label-caps mt-2 shrink-0 text-[0.62rem] text-sage">{p.category}</span>
      </div>
    </Link>
  );
}

/* ---------- CTA band ---------- */
export function CtaBand({ text, button = "Consultation" }: { text: string; button?: string }) {
  return (
    <section className="border-t border-border">
      <div className="container-site flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl font-serif text-3xl leading-snug md:text-4xl">{text}</p>
        <Link to="/contact" className={btn.primary}>{button}</Link>
      </div>
    </section>
  );
}
