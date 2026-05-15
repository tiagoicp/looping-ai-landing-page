import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useJoinWaitlist, useWaitlistCount } from "./hooks/useQueries";

/* ── Intersection-observer hook for scroll animations ─────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );

    const targets = [
      el,
      ...Array.from(el.querySelectorAll(".fade-in-up, .fade-in")),
    ];
    for (const t of targets) {
      observer.observe(t);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ── Slack logo SVG ────────────────────────────────────────── */
function SlackLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── GitHub logo SVG ───────────────────────────────────────── */
function GitHubLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ── Check icon ─────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="oklch(0.44 0.07 196 / 0.12)" />
      <path
        d="M5 8l2 2 4-4"
        stroke="oklch(0.44 0.07 196)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Navigation ────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur-sm shadow-xs"
          : "bg-white"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-0.5 no-underline"
          aria-label="Looping AI home"
        >
          <span className="font-display text-2xl font-bold tracking-tight leading-none text-foreground">
            Looping
          </span>
          <span
            className="font-display text-2xl font-bold tracking-tight leading-none"
            style={{ color: "oklch(0.44 0.07 196)" }}
          >
            AI
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.github_link"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitHubLogo size={16} />
            GitHub
          </a>
          <a
            href="https://slack.com/oauth/v2/authorize"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.add_to_slack_button"
            className="btn-slack text-sm py-2 px-4"
          >
            <SlackLogo size={15} />
            Add to Slack
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.github_link"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <GitHubLogo size={16} />
            GitHub
          </a>
          <a
            href="https://slack.com/oauth/v2/authorize"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.add_to_slack_button"
            className="btn-slack text-sm w-fit"
          >
            <SlackLogo size={15} />
            Add to Slack
          </a>
        </div>
      )}
    </header>
  );
}

/* ── Hero Section ──────────────────────────────────────────── */
function HeroSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="pt-32 pb-0 px-6 max-w-6xl mx-auto"
      aria-label="Hero"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div
          className="fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-8"
          style={{
            background: "oklch(0.44 0.07 196 / 0.08)",
            color: "oklch(0.44 0.07 196)",
            border: "1px solid oklch(0.44 0.07 196 / 0.18)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.44 0.07 196)" }}
          />
          Open Source · Slack Native · Agentic AI
        </div>

        {/* Main headline */}
        <h1 className="fade-in-up delay-100 font-display text-5xl md:text-6xl lg:text-7xl font-bold italic leading-tight tracking-tight mb-6 text-foreground">
          The New Way Your
          <br />
          <span style={{ color: "oklch(0.44 0.07 196)" }}>Team Works.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="fade-in-up delay-200 font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "oklch(0.42 0 0)" }}
        >
          A strongly opinionated agentic AI framework that lives inside Slack —{" "}
          built for real teams with real goals, budgets, and standards.
        </p>

        {/* CTAs */}
        <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="https://slack.com/oauth/v2/authorize"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.add_to_slack_button"
            className="btn-slack"
          >
            <SlackLogo size={18} />
            Add to Slack
          </a>
          <a
            href="#join"
            data-ocid="hero.join_movement_button"
            className="btn-ghost"
          >
            Join the Movement →
          </a>
        </div>
      </div>

      {/* Hero screenshot clipped at bottom */}
      <div className="fade-in-up delay-400 relative max-w-5xl mx-auto">
        <div
          className="screenshot-frame overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        >
          <div className="browser-chrome">
            <span className="browser-dot" style={{ background: "#ff5f56" }} />
            <span className="browser-dot" style={{ background: "#ffbd2e" }} />
            <span className="browser-dot" style={{ background: "#27c93f" }} />
            <div className="url-bar" />
          </div>
          <img
            src="/assets/generated/slack-mockup-main.dim_1200x750.png"
            alt="Looping AI inside Slack — agentic assistant responding in a team channel"
            className="w-full block"
            loading="eager"
          />
        </div>
        {/* Soft glow */}
        <div
          className="absolute inset-x-8 -bottom-6 h-24 blur-2xl opacity-20 rounded-full pointer-events-none"
          style={{ background: "oklch(0.44 0.07 196)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

/* ── Tagline Strip ─────────────────────────────────────────── */
function TaglineStrip() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 mt-16"
      style={{ background: "oklch(0.97 0 0)" }}
      aria-label="Tagline"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className="fade-in font-display text-3xl md:text-4xl lg:text-5xl italic leading-relaxed"
          style={{ color: "oklch(0.28 0 0)" }}
        >
          "Like having the best colleague
          <br className="hidden md:block" /> you never had."
        </p>
      </div>
    </section>
  );
}

/* ── What is Looping AI ────────────────────────────────────── */
const WHAT_POINTS = [
  "Agents aware of your team's real objectives and constraints",
  "Opinionated workflows that back you up, not overwhelm you",
  "Fully governed by Slack Admins — no shadow IT",
  "Self-improving know-hows, versioned and reversible",
  "The AI colleague as committed to quality as you are",
];

function WhatSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-28 px-6 max-w-6xl mx-auto"
      aria-label="What is Looping AI"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <h2 className="fade-in-up font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
            Not ChatGPT
            <br />
            <span style={{ color: "oklch(0.44 0.07 196)" }}>in Slack.</span>
          </h2>
          <p
            className="fade-in-up delay-100 font-body text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "oklch(0.42 0 0)" }}
          >
            Looping AI is a structured framework for agentic AI within the full
            context of your workplace — your goals, metrics, budgets, policies,
            and security posture. Not a chat window bolted onto your workspace.
          </p>
          <ul className="fade-in-up delay-200 space-y-3">
            {WHAT_POINTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-body text-base"
                style={{ color: "oklch(0.36 0 0)" }}
              >
                <span className="mt-0.5 shrink-0">
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Screenshot */}
        <div className="fade-in-up delay-300 relative">
          <div className="screenshot-frame rounded-xl overflow-hidden">
            <div className="browser-chrome">
              <span className="browser-dot" style={{ background: "#ff5f56" }} />
              <span className="browser-dot" style={{ background: "#ffbd2e" }} />
              <span className="browser-dot" style={{ background: "#27c93f" }} />
              <div className="url-bar" />
            </div>
            <img
              src="/assets/generated/slack-mockup-metrics.dim_1200x750.png"
              alt="Looping AI showing metrics and team performance inside Slack"
              className="w-full block"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Features Grid ─────────────────────────────────────────── */
const FEATURES = [
  {
    icon: "⚙️",
    title: "Opinionated Framework",
    body: "Structured agents with goals, metrics, budgets & policies baked in. Not a blank canvas — a clear path.",
  },
  {
    icon: "🔄",
    title: "Quality Feedback Loops",
    body: "Constant learning, self-improving know-hows, versioned and reversible. Your team gets better every cycle.",
  },
  {
    icon: "💡",
    title: "Cost Efficient by Design",
    body: "Tracks LLM spend, optimizes actions as patterns stabilize. Open source means minimal total cost of ownership.",
  },
  {
    icon: "🔌",
    title: "Any LLM Provider",
    body: "Connects directly to Anthropic, OpenAI, Google, Groq and more. Automatically routes to the best model per task.",
  },
  {
    icon: "🛡️",
    title: "Safe by Design",
    body: "Borrows Slack's identity, membership and security. Least-privileged agents. Minimal attack surface — by architecture.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    body: "Only reads channels it's invited to. Strict 1-month maximum data retention. Your team's data stays yours.",
  },
];

const FEATURE_DELAYS = [
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-100",
  "delay-200",
  "delay-300",
];

function FeaturesSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-28 px-6"
      style={{ background: "oklch(0.985 0 0)" }}
      aria-label="Features"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="fade-in-up font-display text-4xl md:text-5xl font-bold leading-tight mb-5 text-foreground">
            Built for how teams
            <br />
            actually work.
          </h2>
          <p
            className="fade-in-up delay-100 font-body text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.50 0 0)" }}
          >
            Every decision in Looping AI is made with real teams in mind — not
            demos, not toy projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              data-ocid={`features.card.${i + 1}`}
              className={`fade-in-up ${FEATURE_DELAYS[i]} bg-white rounded-xl p-8 border border-border`}
              style={{
                boxShadow:
                  "0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <div className="text-3xl mb-5 leading-none">{feature.icon}</div>
              <h3 className="font-display text-xl font-bold mb-3 leading-snug text-foreground">
                {feature.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.50 0 0)" }}
              >
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it Works ──────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Install the Slack App",
    body: "Add Looping AI to your Slack workspace in one click. No infrastructure to manage.",
  },
  {
    num: "02",
    title: "Admins configure agents & policies",
    body: "Workspace admins define goals, policies, approved LLM providers, and least-privileged agent scopes.",
  },
  {
    num: "03",
    title: "Your team works with their best AI colleague",
    body: "Every team member now has a tireless, context-aware partner who knows the goals, respects the budget, and improves over time.",
  },
];

function HowItWorksSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-28 px-6 max-w-6xl mx-auto"
      aria-label="How it works"
    >
      <div className="text-center mb-16">
        <h2 className="fade-in-up font-display text-4xl md:text-5xl font-bold leading-tight mb-5 text-foreground">
          Simple for users.
          <br />
          Powerful for teams.
        </h2>
        <p
          className="fade-in-up delay-100 font-body text-lg max-w-xl mx-auto"
          style={{ color: "oklch(0.50 0 0)" }}
        >
          From installation to your first AI-powered workflow in minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            data-ocid={`how_it_works.step.${i + 1}`}
            className={`fade-in-up delay-${(i + 1) * 100} relative`}
          >
            {i < STEPS.length - 1 && (
              <div
                className="hidden md:block absolute top-6 left-full w-full h-px"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.91 0 0), transparent)",
                }}
                aria-hidden="true"
              />
            )}
            <div
              className="text-5xl font-display font-bold mb-4 leading-none"
              style={{ color: "oklch(0.44 0.07 196 / 0.18)" }}
            >
              {step.num}
            </div>
            <h3 className="font-display text-xl font-bold mb-3 leading-snug text-foreground">
              {step.title}
            </h3>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.50 0 0)" }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* Phone mockup */}
      <div className="fade-in flex justify-center">
        <div
          className="relative max-w-xs w-full animate-float"
          style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.14))" }}
        >
          <img
            src="/assets/generated/slack-mockup-mobile.dim_600x900.png"
            alt="Looping AI on mobile — Slack app with AI assistant"
            className="w-full rounded-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ── Open Source Section ───────────────────────────────────── */
function OpenSourceSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-28 px-6"
      style={{ background: "oklch(0.97 0 0)" }}
      aria-label="Open Source and Community"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div
              className="fade-in inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-8"
              style={{
                background: "oklch(0.44 0.07 196 / 0.08)",
                color: "oklch(0.44 0.07 196)",
                border: "1px solid oklch(0.44 0.07 196 / 0.18)",
              }}
            >
              100% Open Source
            </div>
            <h2 className="fade-in-up font-display text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
              Powered by community.
              <br />
              <span style={{ color: "oklch(0.44 0.07 196)" }}>
                Built for everyone.
              </span>
            </h2>
            <p
              className="fade-in-up delay-100 font-body text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "oklch(0.42 0 0)" }}
            >
              Looping AI is fully open source, shaped by passionate volunteers
              who believe transformative technology should benefit everyone —
              not just the most resourceful. No vendor lock-in. No black box.
              Just great software, built in the open.
            </p>
            <div className="fade-in-up delay-200 flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2"
              >
                <GitHubLogo size={16} />
                View on GitHub
              </a>
              <a href="#join" className="btn-teal">
                Join the Movement →
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="fade-in-up delay-300 flex justify-center">
            <img
              src="/assets/generated/feedback-loop-illustration-transparent.dim_800x600.png"
              alt="Feedback loop illustration — continuous learning and improvement cycle"
              className="w-full max-w-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Join the Movement CTA ─────────────────────────────────── */
function JoinCtaSection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const { data: count } = useWaitlistCount();
  const { mutate: join, isPending, isSuccess, isError } = useJoinWaitlist();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !company.trim()) return;

    join(
      { email: email.trim(), companyName: company.trim() },
      {
        onSuccess: () => {
          toast.success("You're on the list! We'll be in touch.");
          setEmail("");
          setCompany("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  }

  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      id="join"
      className="py-32 px-6"
      style={{ background: "oklch(0.13 0 0)" }}
      aria-label="Join the movement"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2
          className="fade-in-up font-display text-5xl md:text-6xl font-bold italic leading-tight mb-6"
          style={{ color: "white" }}
        >
          Start the loop today.
        </h2>
        <p
          className="fade-in-up delay-100 font-body text-lg leading-relaxed mb-10"
          style={{ color: "oklch(0.72 0 0)" }}
        >
          Join teams already working smarter. Install the Slack App and
          experience agentic AI built for your workplace.
        </p>

        {/* Waitlist count */}
        {count !== undefined && count > BigInt(0) && (
          <p
            className="fade-in font-body text-sm mb-8"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            <span
              style={{ color: "oklch(0.44 0.07 196)" }}
              className="font-semibold"
            >
              {count.toString()}
            </span>{" "}
            teams have joined the movement.
          </p>
        )}

        {/* Form or success */}
        {isSuccess ? (
          <div
            data-ocid="cta.success_state"
            className="fade-in rounded-2xl p-10 text-center"
            style={{
              background: "oklch(0.44 0.07 196 / 0.12)",
              border: "1px solid oklch(0.44 0.07 196 / 0.3)",
            }}
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "white" }}
            >
              You're in!
            </h3>
            <p
              className="font-body text-base"
              style={{ color: "oklch(0.72 0 0)" }}
            >
              We'll reach out as soon as Looping AI is ready for your team.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="fade-in-up delay-200 flex flex-col gap-4"
            noValidate
          >
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="cta.email_input"
              className="w-full px-5 py-3.5 rounded-xl font-body text-base transition-colors outline-none"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1.5px solid oklch(1 0 0 / 0.12)",
                color: "white",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "oklch(0.44 0.07 196)";
                e.target.style.background = "oklch(1 0 0 / 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "oklch(1 0 0 / 0.12)";
                e.target.style.background = "oklch(1 0 0 / 0.06)";
              }}
            />
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              data-ocid="cta.company_input"
              className="w-full px-5 py-3.5 rounded-xl font-body text-base transition-colors outline-none"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1.5px solid oklch(1 0 0 / 0.12)",
                color: "white",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "oklch(0.44 0.07 196)";
                e.target.style.background = "oklch(1 0 0 / 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "oklch(1 0 0 / 0.12)";
                e.target.style.background = "oklch(1 0 0 / 0.06)";
              }}
            />

            {isPending && (
              <div
                data-ocid="cta.loading_state"
                className="text-center text-sm font-body"
                style={{ color: "oklch(0.60 0 0)" }}
              >
                Joining waitlist…
              </div>
            )}

            {isError && (
              <div
                data-ocid="cta.error_state"
                className="text-center text-sm font-body"
                style={{ color: "oklch(0.72 0.12 22)" }}
              >
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || !email || !company}
              data-ocid="cta.submit_button"
              className="w-full py-3.5 px-6 rounded-xl font-body font-semibold text-base transition-all"
              style={{
                background:
                  isPending || !email || !company
                    ? "oklch(1 0 0 / 0.15)"
                    : "white",
                color:
                  isPending || !email || !company
                    ? "oklch(0.60 0 0)"
                    : "oklch(0.13 0 0)",
                cursor:
                  isPending || !email || !company ? "not-allowed" : "pointer",
              }}
            >
              {isPending ? "Joining…" : "Join the Waitlist"}
            </button>

            <p
              className="font-body text-xs"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              No spam. Just updates on our progress toward launch.
            </p>
          </form>
        )}

        {/* Divider */}
        <div
          className="my-10 border-t"
          style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
        />

        {/* Also add to Slack */}
        <div>
          <p
            className="font-body text-sm mb-4"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Already ready? Install directly:
          </p>
          <a
            href="https://slack.com/oauth/v2/authorize"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-slack inline-flex"
          >
            <SlackLogo size={18} />
            Add to Slack
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "loopingai.app";

  return (
    <footer
      className="py-10 px-6 border-t border-border"
      style={{ background: "oklch(0.985 0 0)" }}
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-0.5">
          <span className="font-display text-lg font-bold text-foreground">
            Looping
          </span>
          <span
            className="font-display text-lg font-bold"
            style={{ color: "oklch(0.44 0.07 196)" }}
          >
            AI
          </span>
        </div>

        {/* Links */}
        <nav
          className="flex items-center gap-6 flex-wrap justify-center"
          aria-label="Footer navigation"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.github_link"
            className="flex items-center gap-1.5 text-sm font-body hover:text-foreground transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            <GitHubLogo size={14} />
            GitHub
          </a>
          <a
            href="/privacy"
            className="text-sm font-body hover:text-foreground transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="text-sm font-body hover:text-foreground transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Terms
          </a>
        </nav>

        {/* Right */}
        <div
          className="text-sm font-body text-center md:text-right"
          style={{ color: "oklch(0.55 0 0)" }}
        >
          <p>© {year} Looping AI. Open Source.</p>
          <p className="mt-1">
            Built with <span style={{ color: "oklch(0.65 0.18 22)" }}>♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── App Root ──────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="bottom-center" />
      <Nav />
      <main>
        <HeroSection />
        <TaglineStrip />
        <WhatSection />
        <FeaturesSection />
        <HowItWorksSection />
        <OpenSourceSection />
        <JoinCtaSection />
      </main>
      <Footer />
    </div>
  );
}
