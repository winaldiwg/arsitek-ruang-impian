import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProject, galleryFor, projects } from "@/data/projects";
import { CtaBand, Eyebrow, ProjectCard, Reveal } from "@/components/site/Site";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found — Arkana Studio" }, { name: "robots", content: "noindex" }] };
    const desc = `${p.style} ${p.category.toLowerCase()} project in ${p.location}, ${p.year}. ${p.brief}`;
    return {
      meta: [
        { title: `${p.name} — Arkana Studio` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Arkana Studio` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProjectDetail,
});

const swatch: Record<string, string> = {}; // placeholder for future custom swatches

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const gallery = galleryFor(p);
  const [lb, setLb] = useState<number | null>(null);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length]!;
  const next = projects[(idx + 1) % projects.length]!;
  const related = projects.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  useEffect(() => {
    if (lb === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLb((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [lb, gallery.length]);

  return (
    <>
      <section className="relative flex h-[85svh] min-h-[520px] items-end overflow-hidden">
        <img src={p.image} alt={`${p.name} in ${p.location}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="container-site relative pb-16 text-background">
          <nav className="label-caps opacity-80"><Link to="/">Home</Link> / <Link to="/portfolio">Portfolio</Link> / {p.name}</nav>
          <h1 className="mt-5 text-5xl font-light md:text-8xl">{p.name}</h1>
        </div>
      </section>

      <section className="border-b border-border">
        <dl className="container-site grid grid-cols-2 gap-y-6 py-8 md:grid-cols-5">
          {[["Location", p.location], ["Year", String(p.year)], ["Area", p.area], ["Style", p.style], ["Category", p.category]].map(([k, v]) => (
            <div key={k}><dt className="label-caps text-muted-foreground">{k}</dt><dd className="mt-2 font-serif text-xl">{v}</dd></div>
          ))}
        </dl>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-3 md:py-32">
        {[["Client Brief", p.brief], ["Challenge", p.challenge], ["Design Solution", p.solution]].map(([h, t], i) => (
          <Reveal key={h} delay={i * 100}>
            <p className="label-caps text-primary">0{i + 1}</p>
            <h2 className="mt-3 text-3xl">{h}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t}</p>
          </Reveal>
        ))}
      </section>

      <section className="container-site">
        <Eyebrow>Gallery</Eyebrow>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setLb(i)} className={`group relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`} aria-label={`Open image: ${g.caption}`}>
              <img src={g.src} alt={`${p.name} — ${g.caption}`} loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <span className="label-caps absolute bottom-3 left-3 bg-background/90 px-2 py-1 text-[0.6rem]">{g.caption}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-2">
        <div>
          <Eyebrow>Key Materials</Eyebrow>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {p.materials.map((m, i) => (
              <li key={m} className="flex items-center gap-4 py-4">
                <span className="h-6 w-6 rounded-full border border-border" style={{ background: swatch[m] ?? `color-mix(in oklab, var(--primary) ${20 + i * 18}%, var(--sand))` }} />
                <span className="font-serif text-xl">{m}</span>
              </li>
            ))}
          </ul>
        </div>
        {p.testimonial && (
          <figure className="self-center border-l-2 border-primary pl-8">
            <blockquote className="font-serif text-2xl italic leading-relaxed md:text-3xl">“{p.testimonial.quote}”</blockquote>
            <figcaption className="label-caps mt-6 text-muted-foreground">{p.testimonial.author}</figcaption>
          </figure>
        )}
      </section>

      <nav className="container-site flex justify-between border-y border-border py-8 text-sm" aria-label="Project navigation">
        <Link to="/portfolio/$slug" params={{ slug: prev.slug }} className="group flex flex-col hover:text-primary">
          <span className="label-caps text-muted-foreground">← Previous project</span><span className="mt-1 font-serif text-xl">{prev.name}</span>
        </Link>
        <Link to="/portfolio/$slug" params={{ slug: next.slug }} className="flex flex-col text-right hover:text-primary">
          <span className="label-caps text-muted-foreground">Next project →</span><span className="mt-1 font-serif text-xl">{next.name}</span>
        </Link>
      </nav>

      <section className="container-site py-24">
        <h2 className="text-4xl">Related Projects</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProjectCard key={r.slug} p={r} />)}</div>
      </section>

      <CtaBand text="Interested in a similar project? Talk to us." />

      {lb !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4" onClick={() => setLb(null)}>
          <button className="absolute right-5 top-5 text-background" aria-label="Close"><X className="h-7 w-7 stroke-[1.25]" /></button>
          <button className="absolute left-3 p-3 text-background md:left-8" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + gallery.length) % gallery.length); }}><ChevronLeft className="h-8 w-8 stroke-[1]" /></button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lb]!.src} alt={`${p.name} — ${gallery[lb]!.caption}`} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="label-caps mt-4 text-center text-background/80">{gallery[lb]!.caption} · {lb + 1}/{gallery.length}</figcaption>
          </figure>
          <button className="absolute right-3 p-3 text-background md:right-8" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % gallery.length); }}><ChevronRight className="h-8 w-8 stroke-[1]" /></button>
        </div>
      )}
    </>
  );
}
