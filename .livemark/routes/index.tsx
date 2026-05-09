import { Link, createFileRoute } from "@tanstack/react-router"
import {
  ArrowRight,
  BookOpen,
  Boxes,
  GitBranch,
  Github,
  Laptop,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react"
import type { ComponentType, ReactNode, SVGProps } from "react"
import { buttonVariants } from "livemark/elements/button"
import { useInView } from "livemark/hooks/in-view"
import { cn } from "livemark/utils/style"

// @ts-ignore
export const Route = createFileRoute("/")({
  component: Landing,
})

function Landing() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Showcase />
      <FinalCta />
      <Stack />
    </div>
  )
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border flex items-center min-h-[calc(100vh-4rem)]">
      <BackgroundGrid />
      <div className="relative w-full mx-auto max-w-5xl px-6 py-16 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
          <Sparkles className="size-3.5 text-primary" />
          Repository template
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
          Build a Fairspec{" "}
          <span className="relative inline-block">
            <span className="relative z-10">extension</span>
            <span
              aria-hidden
              className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-primary/20 -z-0 rounded"
            />
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A template for rapid{" "}
          <code className="font-mono text-foreground">Fairspec</code> extension
          development. Generates{" "}
          <code className="font-mono text-foreground">Python</code> and{" "}
          <code className="font-mono text-foreground">TypeScript</code> SDKs
          automatically from your profile and table schemas.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/overview/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-5 no-underline",
            )}
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="https://github.com/fairspec/fairspec-extension"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-5 no-underline",
            )}
          >
            <Github className="size-4" />
            View source
          </a>
        </div>

        <div className="mt-10 hidden sm:inline-flex items-center gap-3 rounded-lg border border-border bg-card/50 backdrop-blur px-4 py-2.5 font-mono text-sm text-muted-foreground">
          <span className="text-primary select-none">$</span>
          <span>
            <span className="text-foreground">pnpm</span> configure
          </span>
        </div>
      </div>
    </section>
  )
}

function BackgroundGrid() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_8px)] opacity-25 [mask-image:linear-gradient(to_top,black_10%,transparent_85%)]"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-blue-400/30 dark:bg-blue-500/25 blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-sky-400/25 dark:bg-sky-500/20 blur-[110px] pointer-events-none"
      />
    </>
  )
}

/* ─────────────────────────── Features ─────────────────────────── */

interface Feature {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Rocket,
    title: "Simple",
    description:
      "Publish a Fairspec extension in minutes, without writing any boilerplate. Edit a JSON schema and run one command.",
  },
  {
    icon: Sparkles,
    title: "Modern",
    description:
      "Built on the latest Fairspec standard, supporting any business domain logic with a clean, well-typed surface.",
  },
  {
    icon: BookOpen,
    title: "Standard",
    description:
      "Based on the widely-used Fairspec specification, making extensions compatible with the wider Fairspec software ecosystem.",
  },
  {
    icon: Wand2,
    title: "Automatic",
    description:
      "Python and TypeScript SDKs are generated from your schemas — no hand-written models, no drift between languages.",
  },
  {
    icon: GitBranch,
    title: "Versioned",
    description:
      "Semantic versioning, GitHub releases, and an auto-published changelog wired up out of the box.",
  },
  {
    icon: Laptop,
    title: "Documented",
    description:
      "Specification and data tables render to a Livemark documentation site that ships with the template.",
  },
]

function Features() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything an extension needs
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Sensible defaults, no setup to start, and SDKs you don't have to
              maintain.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delayMs={i * 60}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="h-full group relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="inline-flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 transition-colors">
        <Icon className="size-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

/* ─────────────────────────── Showcase ─────────────────────────── */

const tk = {
  punct: "text-[#7c7f93] dark:text-[#9399b2]",
  key: "text-[#1e66f5] dark:text-[#89b4fa]",
  str: "text-[#40a02b] dark:text-[#a6e3a1]",
  num: "text-[#fe640b] dark:text-[#fab387]",
  url: "text-[#179299] dark:text-[#94e2d5]",
  body: "text-[#4c4f69] dark:text-[#cdd6f4]",
}

function DatasetSample() {
  return (
    <pre className="p-5 text-sm leading-relaxed font-mono overflow-x-auto">
      <code className={tk.body}>
        <span className={tk.punct}>{"{"}</span>
        {"\n  "}
        <span className={tk.key}>"$schema"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.url}>
          "https://fairspec.github.io/fairspec-extension/profiles/0.4.0/dataset.json"
        </span>
        <span className={tk.punct}>,</span>
        {"\n  "}
        <span className={tk.key}>"resources"</span>
        <span className={tk.punct}>:</span> <span className={tk.punct}>[</span>
        {"\n    "}
        <span className={tk.punct}>{"{"}</span>
        {"\n      "}
        <span className={tk.key}>"name"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.str}>"table1"</span>
        <span className={tk.punct}>,</span>
        {"\n      "}
        <span className={tk.key}>"tableSchema"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.url}>
          "https://fairspec.github.io/fairspec-extension/schemas/0.4.0/table1.json"
        </span>
        <span className={tk.punct}>,</span>
        {"\n      "}
        <span className={tk.key}>"data"</span>
        <span className={tk.punct}>:</span> <span className={tk.punct}>[</span>
        {"\n        "}
        <span className={tk.punct}>{"{"}</span>
        {"\n          "}
        <span className={tk.key}>"id"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.str}>"t1-001"</span>
        <span className={tk.punct}>,</span>
        {"\n          "}
        <span className={tk.key}>"name"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.str}>"First Entity"</span>
        <span className={tk.punct}>,</span>
        {"\n          "}
        <span className={tk.key}>"status"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.str}>"active"</span>
        <span className={tk.punct}>,</span>
        {"\n          "}
        <span className={tk.key}>"value"</span>
        <span className={tk.punct}>:</span>{" "}
        <span className={tk.num}>100.5</span>
        <span className={tk.punct}>,</span>
        {"\n          "}
        <span className={tk.key}>"isVerified"</span>
        <span className={tk.punct}>:</span> <span className={tk.num}>true</span>
        {"\n        "}
        <span className={tk.punct}>{"}"}</span>
        {"\n      "}
        <span className={tk.punct}>]</span>
        {"\n    "}
        <span className={tk.punct}>{"}"}</span>
        {"\n  "}
        <span className={tk.punct}>]</span>
        {"\n"}
        <span className={tk.punct}>{"}"}</span>
      </code>
    </pre>
  )
}

function Showcase() {
  return (
    <section className="border-b border-border bg-primary/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Define a schema. Ship an SDK.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Author your profile and table schemas; the template generates
              typed Python and TypeScript bindings, validation, and a docs site.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-xl border border-primary/20 bg-card overflow-hidden max-w-4xl mx-auto">
            <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-2 bg-muted/50">
              <div className="size-2.5 rounded-full bg-red-400/60" />
              <div className="size-2.5 rounded-full bg-yellow-400/60" />
              <div className="size-2.5 rounded-full bg-green-400/60" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">
                dataset.json
              </span>
            </div>
            <DatasetSample />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────── Final CTA ─────────────────────────── */

function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Describe your data.{" "}
            <span className="text-primary">Publish your extension.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Click "Use this template" on GitHub, configure the metadata, edit
            your schemas, and ship.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/specification/metadata/"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-5 no-underline",
              )}
            >
              Read the specification
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/overview/contributing/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "px-5 no-underline",
              )}
            >
              <Boxes className="size-4" />
              Contributing guide
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────── Stack ─────────────────────────── */

const stackItems = [
  "Fairspec",
  "JSON Schema 2020-12",
  "Python",
  "TypeScript",
  "pnpm",
  "Livemark",
]

function Stack() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Built on open, well-adopted standards
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {stackItems.map(item => (
                <span
                  key={item}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────── Reveal helper ─────────────────────────── */

function Reveal(props: { children: ReactNode; delayMs?: number }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref as (node: HTMLDivElement | null) => void}
      style={{ transitionDelay: `${props.delayMs ?? 0}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      {props.children}
    </div>
  )
}
