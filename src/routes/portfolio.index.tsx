import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { projects, type Category, type Region } from "@/data/projects";
import { CtaBand, PageHeader, ProjectCard } from "@/components/site/Site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Arkana Studio" },
      { name: "description", content: "Homes and interiors designed by Arkana Studio in Bandung and Greater Jakarta." },
      { property: "og:title", content: "Portfolio — Arkana Studio" },
      { property: "og:description", content: "Residential and interior projects across Bandung and Jabodetabek." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [cat, setCat] = useState<"All" | Category>("All");
  const [region, setRegion] = useState<"All" | Region>("All");
  const list = useMemo(
    () => projects.filter((p) => (cat === "All" || p.category === cat) && (region === "All" || p.region === region)),
    [cat, region],
  );
  const count = (c: "All" | Category) => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);

  return (
    <>
      <PageHeader crumb="Portfolio" title="Portfolio"
        intro="Every project is a different story. Here are the homes and spaces we have designed together with clients in Bandung and Greater Jakarta." />
      <section className="container-site">
        <div className="flex flex-col gap-6 border-y border-border py-5 md:flex-row md:items-center md:justify-between">
          <div role="tablist" className="flex gap-8 overflow-x-auto">
            {(["All", "Residential", "Interior"] as const).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn("whitespace-nowrap border-b pb-1 text-sm transition-colors", cat === c ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
                {c} <span className="opacity-60">({count(c)})</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm">
            <span className="label-caps text-muted-foreground">Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value as typeof region)}
              className="rounded-sm border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All</option><option>Bandung</option><option>Jabodetabek</option>
            </select>
          </label>
        </div>
        <div className="grid gap-x-8 gap-y-14 py-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div key={p.slug} className="animate-in fade-in slide-in-from-bottom-2 duration-500"><ProjectCard p={p} /></div>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No projects match this filter yet.</p>}
        </div>
      </section>
      <CtaBand text="Can't find the style you're looking for? Share your references with us." />
    </>
  );
}
