import { createFileRoute } from "@tanstack/react-router";
import { Ear, Leaf, Sun, CloudRain } from "lucide-react";
import { projects, studioDeskImage } from "@/data/projects";
import { CtaBand, Eyebrow, PageHeader, Reveal } from "@/components/site/Site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Arkana Studio" },
      { name: "description", content: "A small Bandung studio founded in 2018, with great attention to the stories of the people who live in its homes." },
      { property: "og:title", content: "About Arkana Studio" },
      { property: "og:description", content: "Our story, philosophy, design approach and team." },
    ],
  }),
  component: About,
});

const team = [
  ["Raka Pradipta, IAI", "Principal Architect & Founder", "Loves homes that grow more beautiful with age."],
  ["Nadira Larasati", "Architect", "Believes small details define the feel of a space."],
  ["Salsabila Wirya", "Interior Designer", "Seeks the balance between calm and character."],
  ["Dimas Hartono", "3D Visualizer & Drafter", "Creates technical drawings and visuals everyone can understand."],
];
const journey = [
  ["2018", "Arkana founded in Bandung"], ["2020", "Began taking interior projects"], ["2022", "First project in Jabodetabek"],
  ["2024", "Passed 40 completed projects"], ["2025", "Expanded team and added supervision services"],
];

function About() {
  return (
    <>
      <PageHeader crumb="About Us" title="About Arkana" intro="A small studio with great attention to the stories of the people who live in its homes." />

      <section className="container-site grid items-center gap-14 pb-24 md:grid-cols-12">
        <Reveal className="md:col-span-6"><img src={studioDeskImage} alt="Sketches, model and material samples on the Arkana studio desk" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={120}>
          <Eyebrow>Our Story</Eyebrow>
          <p className="mt-6 font-serif text-2xl leading-relaxed md:text-3xl">
            Arkana was founded in 2018 in Bandung, beginning with a family home project for a close friend.
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            From there we learned that designing a home is not just drawing a building, but understanding the habits, memories, and hopes of the people who will live in it. Today we serve clients in Bandung and Greater Jakarta with the same spirit.
          </p>
        </Reveal>
      </section>

      <section className="bg-sand py-24 md:py-36">
        <Reveal className="container-site max-w-5xl text-center">
          <Eyebrow>Philosophy</Eyebrow>
          <blockquote className="mt-8 font-serif text-4xl font-light italic leading-tight md:text-6xl">
            “A good home does not have to be luxurious, but it must feel right for the people who live in it.”
          </blockquote>
        </Reveal>
      </section>

      <section className="container-site py-24">
        <h2 className="text-4xl md:text-5xl">Our Design Approach</h2>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[[CloudRain, "Tropical Climate", "Buildings that respond to heat and rain."],
            [Sun, "Natural Light & Air", "Openings that reduce reliance on artificial energy."],
            [Leaf, "Honest Materials", "Natural materials that age beautifully."],
            [Ear, "Listen First", "Every design starts with a conversation, not a template."]].map(([I, t, d]) => {
            const Icon = I as typeof Sun;
            return <div key={t as string} className="bg-background p-8"><Icon className="h-7 w-7 stroke-[1.1] text-primary" /><h3 className="mt-6 text-2xl">{t as string}</h3><p className="mt-2 text-sm text-muted-foreground">{d as string}</p></div>;
          })}
        </div>
      </section>

      <section className="container-site pb-24">
        <h2 className="text-4xl md:text-5xl">The Team</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([n, r, q], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <img src={projects[(i * 3) % projects.length]!.image} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover opacity-30 grayscale" />
                <span className="absolute inset-0 flex items-center justify-center font-serif text-7xl text-primary">
                  {n.split(" ").slice(0, 2).map((w) => w.charAt(0)).join("")}
                </span>
              </div>
              <h3 className="mt-5 text-2xl">{n}</h3>
              <p className="label-caps mt-1 text-sage">{r}</p>
              <p className="mt-3 text-sm italic text-muted-foreground">“{q}”</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="container-site py-20">
          <Eyebrow>Studio Journey</Eyebrow>
          <ol className="mt-10 grid gap-8 md:grid-cols-5">
            {journey.map(([y, t]) => (
              <li key={y} className="border-t border-primary pt-5"><p className="font-serif text-4xl text-primary">{y}</p><p className="mt-2 text-sm text-muted-foreground">{t}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site grid items-center gap-12 py-24 md:grid-cols-2">
        <img src={projects[6]!.image} alt="Warm Family Room in Kemang with walnut built-in shelving" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <figure>
          <span aria-hidden className="font-serif text-7xl leading-none text-primary">“</span>
          <blockquote className="font-serif text-2xl italic leading-relaxed md:text-3xl">The family room that used to be dark is now our favorite place after work. The built-in shelves are perfect for my husband's book collection.</blockquote>
          <figcaption className="mt-6"><p className="font-medium">Mrs. Sarah Anindya</p><p className="label-caps mt-1 text-muted-foreground">Warm Family Room, Kemang</p></figcaption>
        </figure>
      </section>

      <CtaBand text="Let's start with a conversation." />
    </>
  );
}
