import { createFileRoute } from "@tanstack/react-router";
import { Check, FileSearch, MessagesSquare, Ruler, FileText, Image, Wallet } from "lucide-react";
import { projects } from "@/data/projects";
import { CtaBand, Eyebrow, PageHeader, Reveal } from "@/components/site/Site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Arkana Studio" },
      { name: "description", content: "Residential design, interior design, working drawings, cost estimates and supervision in Bandung & Jabodetabek." },
      { property: "og:title", content: "Services — Arkana Studio" },
      { property: "og:description", content: "From new homes to spaces you want to renew, we accompany you at every stage." },
    ],
  }),
  component: Services,
});

const services = [
  { t: "Residential Design", img: projects[3].image, alt: "Courtyard house with timber ceiling and garden",
    d: "We design homes from scratch, tailored to your land, the tropical climate, and the way your family lives.",
    items: ["Design concept and floor plans", "3D renders (exterior and interior)", "Complete working drawings (DED)", "Cost estimate (RAB)", "Building permit (PBG) assistance", "Periodic construction supervision"],
    ideal: "Landowners building a new home or undertaking a major renovation" },
  { t: "Interior Design", img: projects[8].image, alt: "Serene bedroom with timber headboard and window bench",
    d: "Interiors that blend with their occupants' character, from concept to final installation.",
    items: ["Concept and moodboard", "3D renders of each room", "Custom and built-in furniture design", "Material, color, and furniture selection", "Interior working drawings and cost estimate", "Implementation supervision"],
    ideal: "Houses, apartments, cafés, and small offices" },
];

const steps = [
  ["Initial Consultation", "1–2 days", "Discuss needs, land, and budget outlook.", "An agreed scope of work."],
  ["Site Survey", "1–3 days", "Measurements and observation of sun, wind, and surroundings.", "Site data."],
  ["Concept Design", "2–3 weeks", "Floor plans, zoning, and early elevations.", "2–3 concept alternatives."],
  ["3D Design & Revisions", "2–4 weeks", "Detailed visualization and refinement.", "Approved final renders."],
  ["Working Drawings & Cost Estimate", "3–5 weeks", "Technical drawings and cost breakdown.", "Build-ready documents."],
  ["Construction & Supervision", "", "On-site guidance.", "Regular progress reports."],
  ["Handover", "", "Final inspection.", "A home or space ready to live in."],
];

const faqs = [
  ["How long does the design process take?", "Typically 2–3 months for a residential project, depending on size and number of revisions."],
  ["Can I get design only, without construction?", "Yes. You can use our working drawings with a contractor of your choice."],
  ["Do you serve areas outside Bandung and Jabodetabek?", "Our focus is those two regions. For other cities, please discuss through a consultation."],
  ["How do revisions work?", "Each design stage includes a round of revisions agreed upon at the start."],
  ["How much do your services cost?", "Fees are tailored to project scope and scale, so they are discussed through a consultation."],
  ["Is the initial consultation paid?", "The initial consultation is free of charge."],
];

function Services() {
  return (
    <>
      <PageHeader crumb="Services" title="Our Services" intro="From new homes to spaces you want to renew, we accompany you at every stage." />

      {services.map((s, i) => (
        <section key={s.t} className={i === 1 ? "bg-sand" : ""}>
          <div className="container-site grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
            <Reveal className={i === 1 ? "md:order-2" : ""}>
              <img src={s.img} alt={s.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>0{i + 1}</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">{s.t}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
              <p className="label-caps mt-10">What you receive</p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 py-3 text-sm"><Check className="h-4 w-4 shrink-0 stroke-[1.5] text-primary" />{it}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm"><span className="label-caps text-sage">Ideal for</span> <span className="ml-2 text-muted-foreground">{s.ideal}</span></p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="container-site py-24">
        <h2 className="text-4xl">Additional Services</h2>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {[[MessagesSquare, "One-time Design Consultation", "A focused session to resolve a specific design question."],
            [FileSearch, "Drawing & Cost Estimate Review", "A second opinion on existing drawings and budgets."],
            [Ruler, "Site Survey & Measurement", "Accurate measurements and site observation for your project."]].map(([I, t, d]) => {
            const Icon = I as typeof Ruler;
            return (
              <div key={t as string} className="bg-background p-8">
                <Icon className="h-7 w-7 stroke-[1.1] text-primary" />
                <h3 className="mt-6 text-2xl">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32">
        <div className="container-site grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl">Seven steps, one clear path.</h2>
            <p className="mt-5 text-sm text-muted-foreground">Durations are estimates and vary with project scale.</p>
          </div>
          <ol className="relative border-l border-foreground/20 md:col-span-7 md:col-start-6">
            {steps.map(([t, dur, d, r], i) => (
              <Reveal key={t}>
                <li className="relative pb-12 pl-10 last:pb-0">
                  <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[0.65rem] text-primary-foreground">{i + 1}</span>
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <h3 className="text-2xl md:text-3xl">{t}</h3>
                    {dur && <span className="label-caps text-sage">{dur}</span>}
                  </div>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                  <p className="mt-2 text-sm"><span className="font-medium">You receive:</span> {r}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-24">
        <h2 className="text-4xl">What to Prepare</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[[FileText, "Land certificate or property data"], [Image, "Reference images (Pinterest or photos)"], [Wallet, "A picture of your space needs and budget range"]].map(([I, t]) => {
            const Icon = I as typeof Ruler;
            return <div key={t as string} className="border-t border-border pt-6"><Icon className="h-7 w-7 stroke-[1.1] text-primary" /><p className="mt-4 font-serif text-2xl">{t as string}</p></div>;
          })}
        </div>
      </section>

      <section className="container-site grid gap-12 pb-24 md:grid-cols-12">
        <h2 className="text-4xl md:col-span-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="md:col-span-8">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="font-serif text-xl hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CtaBand text="Fees are tailored to each project. Let's discuss through a consultation." button="Schedule a Consultation" />
    </>
  );
}
