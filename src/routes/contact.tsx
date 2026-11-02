import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Instagram, Loader2, Mail, MapPin, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/projects";
import { Eyebrow, PageHeader, btn } from "@/components/site/Site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Consultation — Arkana Studio" },
      { name: "description", content: "Tell us about your home or interior plan. Free initial consultation; we reply within 1 business day." },
      { property: "og:title", content: "Contact Arkana Studio" },
      { property: "og:description", content: "Book a free consultation for your home or interior project in Bandung or Jabodetabek." },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Errors = {};
    if (get("name").length < 2) errs.name = "Please enter your full name.";
    if (!/^\+?[0-9\s-]{9,16}$/.test(get("phone"))) errs.phone = "Please enter a valid WhatsApp number.";
    if (get("email") && !/^\S+@\S+\.\S+$/.test(get("email"))) errs.email = "Please enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    const msg = [
      "Hello Arkana Studio, I would like to consult about my plan.",
      `Name: ${get("name")}`, `WhatsApp: ${get("phone")}`, get("email") && `Email: ${get("email")}`,
      `Project type: ${get("type")}`, get("location") && `Location: ${get("location")}`,
      `Property status: ${get("status")}`, `Planned start: ${get("start")}`, get("needs") && `Needs: ${get("needs")}`,
    ].filter(Boolean).join("\n");
    setTimeout(() => {
      setStatus("sent");
      window.open(whatsappUrl(msg), "_blank", "noopener");
    }, 900);
  }

  const field = "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <>
      <PageHeader crumb="Contact" title="Tell Us About Your Plan" intro="Fill out this short form or contact us directly. We will reply within 1 business day." />

      <section className="container-site grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {status === "sent" ? (
            <div className="border border-border bg-sand p-10" role="status">
              <CheckCircle2 className="h-10 w-10 stroke-[1.1] text-sage" />
              <h2 className="mt-6 text-4xl">Thank you!</h2>
              <p className="mt-3 text-muted-foreground">We will contact you within 1 business day. A WhatsApp window with your details has also been opened.</p>
              <button className={cn(btn.outline, "mt-8")} onClick={() => setStatus("idle")}>Send another message</button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}><input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} /></Field>
              <Field label="WhatsApp number" required error={errors.phone}><input name="phone" type="tel" inputMode="tel" placeholder="+62 812…" autoComplete="tel" className={field} aria-invalid={!!errors.phone} /></Field>
              <Field label="Email (optional)" error={errors.email}><input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} /></Field>
              <Field label="Property location"><input name="location" placeholder="City or area" className={field} /></Field>
              <Choice name="type" label="Project type" options={["Residential", "Interior", "Both"]} />
              <Choice name="status" label="Land / property status" options={["No land yet", "Already own land", "Renovation"]} />
              <Choice name="start" label="Planned start" options={["Immediately", "1–3 months", "Not sure yet"]} className="sm:col-span-2" />
              <Field label="Tell us your needs" className="sm:col-span-2"><textarea name="needs" rows={5} className={field} placeholder="Rooms, family size, style references, budget range…" /></Field>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className={cn(btn.primary, "w-full sm:w-auto disabled:opacity-70")}>
                  {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-border pt-8">
            <Eyebrow>Studio</Eyebrow>
            <ul className="mt-6 space-y-5 text-sm">
              <Info icon={MapPin}>Jl. Ciumbuleuit No. 88, Bandung</Info>
              <Info icon={Clock}>Monday–Saturday, 09:00–17:00 WIB</Info>
              <Info icon={MessageCircle}><a href={whatsappUrl()} className="hover:text-primary">+62 812-0000-0000</a></Info>
              <Info icon={Mail}><a href="mailto:halo@arkanastudio.id" className="hover:text-primary">halo@arkanastudio.id</a></Info>
              <Info icon={Instagram}><a href="https://instagram.com/arkanastudio" className="hover:text-primary">@arkanastudio</a></Info>
            </ul>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={cn(btn.primary, "mt-10 w-full bg-sage hover:bg-foreground")}>
              <MessageCircle className="h-5 w-5 stroke-[1.5]" /> Chat via WhatsApp
            </a>
          </div>
        </aside>
      </section>

      <section aria-label="Map">
        <iframe title="Arkana Studio location" loading="lazy" className="h-[420px] w-full border-0 grayscale-[60%] sepia-[20%]"
          src="https://www.google.com/maps?q=Jl.+Ciumbuleuit,+Bandung&output=embed" />
      </section>

      <section className="container-site py-24">
        <h2 className="text-4xl">Service Areas</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[["Bandung & Surroundings", "Bandung City, Cimahi, Lembang, Dago, Setiabudi, Ciumbuleuit, Soreang"],
            ["Jabodetabek", "Jakarta, Bogor, Depok, Tangerang & BSD City, Bintaro, Bekasi, Cibubur"]].map(([t, a]) => (
            <div key={t} className="border border-border p-8"><h3 className="text-3xl">{t}</h3><p className="mt-4 text-sm leading-loose text-muted-foreground">{a}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-site grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-4xl">What Happens Next</h2>
            <ol className="mt-10 space-y-8">
              {["We read your needs", "We contact you to schedule a consultation", "Initial discussion (online or in person)"].map((s, i) => (
                <li key={s} className="flex gap-6"><span className="font-serif text-5xl leading-none text-primary">{i + 1}</span><p className="pt-2 text-lg">{s}</p></li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-4xl">Quick Questions</h2>
            <Accordion type="single" collapsible className="mt-6">
              {[["Is the consultation paid?", "No — the initial consultation is free of charge."],
                ["Can it be done online?", "Yes. We hold consultations via video call or in person at our Bandung studio."],
                ["What should I prepare?", "Land or property data, reference images, and a rough idea of your space needs and budget range."]].map(([q, a]) => (
                <AccordionItem key={q} value={q!}><AccordionTrigger className="font-serif text-xl hover:no-underline">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, required, error, children, className }: { label: string; required?: boolean; error?: string | undefined; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="label-caps text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Choice({ name, label, options, className }: { name: string; label: string; options: string[]; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="label-caps text-muted-foreground">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} defaultChecked={i === 0} className="peer sr-only" />
            <span className="inline-block rounded-sm border border-input px-4 py-2 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Info({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return <li className="flex gap-4"><Icon className="mt-0.5 h-5 w-5 shrink-0 stroke-[1.25] text-primary" /><span>{children}</span></li>;
}
