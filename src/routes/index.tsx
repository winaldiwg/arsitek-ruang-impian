import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Compass, DraftingCompass, Box, FileText, HardHat, MessageCircle } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { projects, featuredSlugs, testimonials, studioDeskImage, whatsappUrl, getProject } from "@/data/projects";
import { Eyebrow, ProjectCard, Reveal, TextLink, btn } from "@/components/site/Site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arkana Studio — Designing Homes, Keeping Stories" },
      { name: "description", content: "Warm, personal residential architecture and interior design in Bandung & Greater Jakarta. Free initial consultation." },
      { property: "og:title", content: "Arkana Studio — Designing Homes, Keeping Stories" },
      { property: "og:description", content: "Residential architecture and interior design studio in Bandung & Jabodetabek." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = featuredSlugs.map((s) => getProject(s)!);
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[100svh] min-h-[600px] items-end overflow-hidden">
        <img src={hero} alt="Tropical living room in late-afternoon sunlight with timber windows, rattan chair and plants" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/20" />
        <div className="container-site relative pb-28 text-background md:pb-32">
          <p className="label-caps opacity-90">Architecture & Interior Studio</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-light leading-[1.02] sm:text-6xl md:text-8xl">Designing Homes, Keeping Stories</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-90">We design warm, comfortable, and personal homes. Serving Bandung & Greater Jakarta.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/portfolio" className={btn.primary}>View Portfolio</Link>
            <Link to="/contact" className={btn.ghostLight}>Free Consultation</Link>
          </div>
        </div>
        <a href="#intro" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-background/80">
          <ChevronDown className="h-6 w-6 stroke-[1.25]" />
        </a>
      </section>

      {/* Intro */}
      <section id="intro" className="container-site grid items-center gap-14 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-6">
          <Eyebrow>About Arkana</Eyebrow>
          <h2 className="mt-5 text-4xl leading-tight md:text-6xl">A good home begins with listening.</h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Arkana Studio is an architecture and interior design studio based in Bandung. Since 2018, we have helped families design homes that are comfortable, durable, and carry the stories of the people who live in them. We believe a home does not have to be luxurious, but it must feel right.
          </p>
          <div className="mt-10"><TextLink to="/about">Get to know us</TextLink></div>
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={150}>
          <img src={studioDeskImage} alt="Architect's desk with floor plan sketches, a timber model and natural material samples" loading="lazy" width={1200} height={1504} className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </section>

      {/* Services */}
      <section className="bg-sand py-24 md:py-32">
        <div className="container-site">
          <Reveal><Eyebrow>Services</Eyebrow><h2 className="mt-4 text-4xl md:text-6xl">What We Do</h2></Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {[
              { t: "Residential Design", d: "From early concept to working drawings, we design homes that fit your land, the tropical climate, and your family's lifestyle.", img: projects[0]!.image, alt: "Stepped modern tropical house on a hillside" },
              { t: "Interior Design", d: "Interiors that blend with the character of their occupants, complete with custom furniture and material selection.", img: projects[5]!.image, alt: "Japandi living room with oak slatted partition" },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 120}>
                <Link to="/services" className="group block">
                  <div className="overflow-hidden"><img src={s.img} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" /></div>
                  <h3 className="mt-7 text-3xl md:text-4xl">{s.t}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{s.d}</p>
                  <span className="mt-5 inline-block border-b border-foreground/40 pb-1 text-sm font-medium group-hover:border-primary group-hover:text-primary">Learn more →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-site py-24 md:py-36">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl md:text-6xl">Featured Projects</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">A selection of homes and spaces we have designed together with our clients.</p>
          </div>
          <Link to="/portfolio" className={cn(btn.outline, "self-start md:self-auto")}>View All Projects</Link>
        </Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12">
          {featured.map((p, i) => {
            const layout = [
              "md:col-span-7", "md:col-span-5 md:mt-32", "md:col-span-5",
              "md:col-span-7 md:mt-24", "md:col-span-6", "md:col-span-6 md:mt-20",
            ][i]!;
            const aspect = i === 0 || i === 3 ? "aspect-[5/4]" : "aspect-[4/5]";
            return <Reveal key={p.slug} className={layout} delay={(i % 2) * 120}><ProjectCard p={p} aspect={aspect} /></Reveal>;
          })}
        </div>
      </section>

      <Stats />

      {/* Process */}
      <section className="container-site py-24 md:py-32">
        <Reveal><Eyebrow>Process</Eyebrow><h2 className="mt-4 text-4xl md:text-6xl">How We Work</h2></Reveal>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {[
            { i: MessageCircle, t: "Consultation", d: "We listen to your needs, land, and budget outlook." },
            { i: Compass, t: "Concept", d: "Zoning and floor plan alternatives shaped around your life." },
            { i: Box, t: "3D Design", d: "Detailed visuals so you can see your home before it's built." },
            { i: FileText, t: "Working Drawings", d: "Build-ready technical drawings and cost estimates." },
            { i: HardHat, t: "Construction", d: "On-site guidance until the keys are in your hand." },
          ].map((s, idx) => (
            <Reveal key={s.t} delay={idx * 90}>
              <li className="relative border-t border-border pt-8 lg:pr-8">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-primary" />
                <s.i className="h-7 w-7 stroke-[1.1] text-primary" />
                <p className="label-caps mt-6 text-muted-foreground">0{idx + 1}</p>
                <h3 className="mt-2 text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14"><TextLink to="/services">See the full process</TextLink></div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={projects[6]!.image} alt="Warm family room with walnut built-in shelving" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay-strong" />
        <div className="container-site relative py-32 text-center text-background md:py-44">
          <Reveal>
            <DraftingCompass className="mx-auto h-8 w-8 stroke-[1]" />
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">Have a home or dream space in mind?</h2>
            <p className="mt-6 text-lg opacity-90">Tell us what you need. The initial consultation is free.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={btn.primary}>Start a Consultation</Link>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={btn.ghostLight}>Chat via WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stats() {
  const stats = [
    { n: 45, s: "+", l: "Projects Completed" },
    { n: 8, s: "", l: "Years of Experience" },
    { n: 2, s: "", l: "Service Regions", sub: "Bandung & Jabodetabek" },
    { n: 30, s: "+", l: "Families & Clients" },
  ];
  return (
    <section className="border-y border-border">
      <div className="container-site grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className={cn("py-12 text-center md:py-16", i % 2 === 1 && "border-l border-border", i >= 2 && "border-t border-border lg:border-t-0", i === 2 && "lg:border-l")}>
            <p className="font-serif text-6xl font-light text-primary md:text-7xl"><CountUp to={s.n} suffix={s.s} /></p>
            <p className="label-caps mt-3">{s.l}</p>
            {s.sub && <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  const go = (d: number) => setI((x) => (x + d + testimonials.length) % testimonials.length);
  useEffect(() => {
    const id = setInterval(() => go(1), 8000);
    return () => clearInterval(id);
  }, [i]);
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="container-site max-w-4xl text-center">
        <Eyebrow>Testimonials</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-5xl">Stories from Our Clients</h2>
        <figure key={i} className="mt-14 animate-in fade-in duration-700">
          <span aria-hidden className="font-serif text-7xl leading-none text-primary">“</span>
          <blockquote className="font-serif text-2xl italic leading-relaxed md:text-3xl">{t.quote}</blockquote>
          <figcaption className="mt-8"><p className="font-medium">{t.author}</p><p className="label-caps mt-1 text-muted-foreground">{t.project}</p></figcaption>
        </figure>
        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full border border-foreground/30 p-3 hover:border-primary hover:text-primary"><ChevronLeft className="h-4 w-4 stroke-[1.25]" /></button>
          <div className="flex gap-2">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={cn("h-1.5 rounded-full transition-all", k === i ? "w-8 bg-primary" : "w-1.5 bg-foreground/30")} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full border border-foreground/30 p-3 hover:border-primary hover:text-primary"><ChevronRight className="h-4 w-4 stroke-[1.25]" /></button>
        </div>
      </div>
    </section>
  );
}
