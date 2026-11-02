import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer, Header, WhatsAppFab, btn } from "@/components/site/Site";

function NotFoundComponent() {
  return (
    <div className="container-site flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="label-caps text-primary">404</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-tight md:text-7xl">This space hasn't been designed yet.</h1>
      <p className="mt-6 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className={`${btn.primary} mt-10`}>Back to Home</Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className={btn.primary}>Try again</button>
          <a href="/" className={btn.outline}>Go home</a>
        </div>
      </div>
    </div>
  );
}

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Arkana Studio",
  description: "Architecture and interior design studio serving Bandung & Greater Jakarta.",
  address: { "@type": "PostalAddress", streetAddress: "Jl. Ciumbuleuit No. 88", addressLocality: "Bandung", addressCountry: "ID" },
  telephone: "+62 812-0000-0000",
  email: "halo@arkanastudio.id",
  openingHours: "Mo-Sa 09:00-17:00",
  areaServed: ["Bandung", "Jabodetabek"],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arkana Studio — Architecture & Interior Design" },
      { name: "description", content: "Architecture and interior design studio serving Bandung & Greater Jakarta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </QueryClientProvider>
  );
}
