import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleUserRound,
  Command,
  Database,
  ExternalLink,
  FileDown,
  Github,
  GraduationCap,
  Keyboard,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { education } from "@/data/education";
import { certificates } from "@/data/certificates";
import { social } from "@/data/social";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prince Shourya | AI & Data Science Student" },
      {
        name: "description",
        content:
          "Portfolio of Prince Shourya, an AI & Data Science / CS-AIML student interested in Artificial Intelligence, Machine Learning, Data Analytics and modern technology.",
      },
      { property: "og:title", content: "Prince Shourya | AI & Data Science Student" },
      {
        property: "og:description",
        content:
          "Portfolio of Prince Shourya, an AI & Data Science / CS-AIML student interested in Artificial Intelligence, Machine Learning, Data Analytics and modern technology.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Prince Shourya | AI & Data Science Student" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Prince Shourya, an AI & Data Science / CS-AIML student interested in Artificial Intelligence, Machine Learning, Data Analytics and modern technology.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: PortfolioPage,
});

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Certificates", "certificates"],
  ["Contact", "contact"],
] as const;

const projectFilters = ["All", "AI", "Machine Learning", "Data Science", "Web Development"] as const;
type Filter = (typeof projectFilters)[number];

function PortfolioPage() {
  const reduceMotion = Boolean(useReducedMotion());
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("prince-shourya-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = savedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    const timer = window.setTimeout(() => setLoading(false), reduceMotion ? 250 : 850);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("prince-shourya-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowBackToTop(window.scrollY > 560);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -55%" },
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [loading]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.category === filter || (filter === "AI" && project.category === "Machine Learning");
      const searchable = [project.title, project.category, ...project.technologies].join(" ").toLowerCase();
      return matchesFilter && (!query || searchable.includes(query));
    });
  }, [filter, search]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMobileMenuOpen(false);
    setPaletteOpen(false);
  };

  const toggleTheme = () => setTheme((value) => (value === "light" ? "dark" : "light"));

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed -left-24 -top-24 -z-10 size-96 rounded-full bg-violet/20 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-40 -z-10 size-96 rounded-full bg-blue/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 -z-10 size-80 rounded-full bg-mint/20 blur-3xl" />
      <div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-indigo" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
          <button type="button" className="flex items-center gap-3 text-left" onClick={() => goTo("home")} aria-label="Go to home">
            <span className="grid size-11 place-items-center rounded-2xl bg-indigo font-display text-lg font-semibold text-primary-foreground clay-shadow-sm">{profile.initials}</span>
            <span className="leading-tight">
              <span className="block text-[15px] font-bold">{profile.name}</span>
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground">CS · AIML</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-2xl bg-card/80 p-1.5 ring-1 ring-border/60 clay-shadow-sm lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <button
                type="button"
                key={id}
                onClick={() => goTo(id)}
                className={cn("rounded-xl px-3 py-2 text-sm font-medium transition-colors", activeSection === id ? "bg-ink text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" className="hidden rounded-2xl bg-violet text-primary-foreground clay-shadow-sm sm:inline-flex" onClick={() => goTo("projects")}>
              View Projects <ArrowDown aria-hidden="true" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-2xl" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-2xl lg:hidden" onClick={() => setMobileMenuOpen((value) => !value)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border/60 px-6 py-3 lg:hidden" aria-label="Mobile navigation">
              <div className="mx-auto grid max-w-6xl gap-1 md:px-6">
                {navItems.map(([label, id]) => <Button key={id} type="button" variant="ghost" className="justify-start rounded-xl" onClick={() => goTo(id)}>{label}</Button>)}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 md:px-12 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-mint/40 px-4 py-1.5 text-xs font-semibold ring-1 ring-mint/50"><span className="size-2 rounded-full bg-emerald-500" /> Open to Learning &amp; Opportunities</span>
            <p className="mb-3 font-mono text-sm text-indigo">Hi, I'm {profile.name}</p>
            <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance md:text-6xl">Building Intelligent Solutions with <span className="text-indigo">AI</span>, <span className="text-violet">ML</span> &amp; Data</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
            <RotatingInterest reduceMotion={reduceMotion} />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button type="button" className="h-12 rounded-2xl bg-ink px-7 text-primary-foreground clay-shadow" onClick={() => goTo("projects")}>Explore My Work <ArrowDown aria-hidden="true" /></Button>
              <Button type="button" variant="outline" className="h-12 rounded-2xl bg-card px-7 clay-shadow-sm" onClick={() => goTo("contact")}>Let's Connect <ChevronRight aria-hidden="true" /></Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {[["Python", "bg-indigo/15 text-indigo"], ["Generative AI", "bg-blue/15 text-blue"], ["Data Analytics", "bg-rose/20 text-rose"]].map(([label, className]) => <span key={label} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold", className)}>{label}</span>)}
            </div>
          </motion.div>
          <NeuralVisual reduceMotion={reduceMotion} />
        </section>

        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
          <SectionHeading eyebrow="01 — About" title="What I Focus On" aside="Sanskriti University · CS-AIML · 2026 – Present" />
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">{profile.about}</p>
          <div className="grid gap-6 md:grid-cols-3">
            <FocusCard icon={<BrainCircuit />} title="AI & Machine Learning" description="Building and evaluating models from data preparation to inference, with a focus on practical AI systems." tone="indigo" />
            <FocusCard icon={<Database />} title="Data Analytics" description="Exploratory analysis and visualization to extract meaningful, actionable insights from real datasets." tone="violet" />
            <FocusCard icon={<Sparkles />} title="Problem Solving" description="Breaking complex problems into clear, workable steps and turning concepts into useful solutions." tone="mint" />
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
          <SectionHeading eyebrow="02 — Skills" title="Skills & Technologies" aside="Learning is part of the build." />
          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => <SkillCard key={group.name} group={group} />)}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="03 — Projects" title="Featured Projects" aside="Concepts becoming practical systems." />
            <div className="flex w-full max-w-sm items-center gap-2 rounded-2xl bg-card px-4 py-2.5 ring-1 ring-border/70 clay-shadow-sm">
              <Search className="size-4 text-muted-foreground" aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search projects" aria-label="Search projects" />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Project filters">
            {projectFilters.map((item) => <Button key={item} type="button" variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)} className="rounded-full">{item}</Button>)}
          </div>
          {filteredProjects.length ? <div className="mt-8 grid gap-6 md:grid-cols-3">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProject(project)} />)}</div> : <div className="mt-8 rounded-3xl bg-card p-12 text-center ring-1 ring-border/70 clay-shadow-sm"><Search className="mx-auto size-8 text-muted-foreground" aria-hidden="true" /><p className="mt-4 font-display text-xl">No projects found.</p><p className="mt-2 text-sm text-muted-foreground">Try a different search or filter.</p></div>}
        </section>

        <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
          <SectionHeading eyebrow="04 — Education" title="Academic Path" aside="The next chapter is in progress." />
          <div className="relative ml-2 border-l border-indigo/30 pl-8">
            {education.map((item) => <div key={item.institution} className="relative rounded-3xl bg-card p-7 ring-1 ring-border/70 clay-shadow"><span className="absolute -left-[2.55rem] top-8 grid size-5 place-items-center rounded-full bg-indigo ring-8 ring-background"><span className="size-1.5 rounded-full bg-primary-foreground" /></span><p className="font-mono text-xs text-indigo">{item.period}</p><h3 className="mt-2 font-display text-2xl">{item.institution}</h3><p className="mt-2 font-semibold">{item.program}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>)}
          </div>
        </section>

        <section id="certificates" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:px-12">
          <SectionHeading eyebrow="05 — Certificates" title="Proof, when ready" aside="Verified information only." />
          {certificates.length ? <div className="grid gap-6 md:grid-cols-3">{certificates.map((certificate) => <div key={certificate.name} className="rounded-3xl bg-card p-6 ring-1 ring-border/70 clay-shadow"><h3 className="font-display text-xl">{certificate.name}</h3><p className="mt-2 text-sm text-muted-foreground">{certificate.organization} · {certificate.date}</p></div>)}</div> : <div className="rounded-3xl bg-card p-10 text-center ring-1 ring-border/70 clay-shadow-sm"><GraduationCap className="mx-auto size-9 text-violet" aria-hidden="true" /><h3 className="mt-4 font-display text-2xl">Certificates Coming Soon</h3><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Verified certificate information will appear here when it is ready to share.</p></div>}
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12"><ResumePanel onDownload={() => void downloadResume(profile.resumePath)} /></section>

        <section id="contact" className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-6 py-20 md:px-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div><SectionHeading eyebrow="06 — Contact" title="Let's Connect" aside="Ideas are better when shared." /><p className="mt-6 text-base leading-relaxed text-muted-foreground">I'm always interested in learning, collaborating and discussing ideas around AI, Machine Learning and technology.</p><div className="mt-8 grid gap-3">{[[Mail, "Email", social.email], [Github, "GitHub", social.github], [Linkedin, "LinkedIn", social.linkedin]].map(([Icon, label, value]) => <ContactLink key={label as string} Icon={Icon as typeof Mail} label={label as string} value={value as string} />)}</div></div>
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-border/60"><div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12"><div><p className="font-display text-lg font-semibold">{profile.name}</p><p className="text-sm text-muted-foreground">{profile.role}</p></div><nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer navigation">{[["Home", "home"], ["About", "about"], ["Projects", "projects"], ["Contact", "contact"]].map(([label, id]) => <button key={id} type="button" onClick={() => goTo(id)} className="transition-colors hover:text-foreground">{label}</button>)}</nav><p className="font-mono text-xs text-muted-foreground">© 2026 {profile.name}. All rights reserved.</p></div></footer>

      <AnimatePresence>{showBackToTop && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="fixed bottom-6 right-6 z-30"><Button type="button" size="icon" className="size-12 rounded-full bg-ink text-primary-foreground clay-shadow" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} aria-label="Back to top"><ArrowUp aria-hidden="true" /></Button></motion.div>}</AnimatePresence>
      <CustomCursor reduceMotion={reduceMotion} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onGoTo={goTo} onToggleTheme={toggleTheme} onDownload={() => void downloadResume(profile.resumePath)} />
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

const toneClasses: Record<string, string> = {
  indigo: "bg-indigo", violet: "bg-violet", blue: "bg-blue", mint: "bg-mint", rose: "bg-rose", amber: "bg-amber",
};
const focusToneClasses: Record<"indigo" | "violet" | "mint", string> = {
  indigo: "bg-indigo/15 text-indigo", violet: "bg-violet/15 text-violet", mint: "bg-mint/15 text-mint",
};
const skillToneClasses: Record<"indigo" | "violet" | "mint", string> = {
  indigo: "text-indigo", violet: "text-violet", mint: "text-mint",
};

function CustomCursor({ reduceMotion }: { reduceMotion: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let hovered = false;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = event.target as HTMLElement | null;
      hovered = Boolean(target?.closest("a, button, input, textarea, select, [role='button']"));
      dotRef.current?.style.setProperty("transform", `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`);
    };
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringRef.current?.style.setProperty("transform", `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${hovered ? 1.55 : 1})`);
      raf = window.requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); window.cancelAnimationFrame(raf); };
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return <div className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block" aria-hidden="true"><div ref={ringRef} className="absolute size-8 rounded-full border border-indigo/50 transition-[width,height,background-color] duration-200" /><div ref={dotRef} className="absolute size-1.5 rounded-full bg-indigo" /></div>;
}

function LoadingScreen() {
  return <div className="grid min-h-screen place-items-center bg-background px-6"><div className="w-full max-w-sm text-center"><div className="mx-auto grid size-20 place-items-center rounded-[2rem] bg-indigo font-display text-2xl font-semibold text-primary-foreground clay-shadow">PS</div><p className="mt-6 font-display text-2xl">{profile.name}</p><p className="mt-2 font-mono text-xs text-muted-foreground">initializing neural.workspace</p><div className="mx-auto mt-6 h-1.5 max-w-56 overflow-hidden rounded-full bg-muted"><div className="loading-line h-full rounded-full bg-violet" /></div></div></div>;
}

function RotatingInterest({ reduceMotion }: { reduceMotion: boolean }) {
  const interests = ["AI & Data Science", "Machine Learning", "Data Analytics", "Generative AI"] as const;
  const [index, setIndex] = useState(0);
  useEffect(() => { if (reduceMotion) return; const timer = window.setInterval(() => setIndex((value) => (value + 1) % interests.length), 2200); return () => window.clearInterval(timer); }, [reduceMotion, interests.length]);
  return <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 clay-shadow-sm ring-1 ring-border/70"><ArrowRightMark /><AnimatePresence mode="wait"><motion.span key={interests[index] ?? interests[0]} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} className="font-mono text-sm font-bold">{interests[index] ?? interests[0]}</motion.span></AnimatePresence></div>;
}

function ArrowRightMark() { return <span className="text-muted-foreground" aria-hidden="true">→</span>; }

function NeuralVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return <motion.div initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative"><div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-card ring-1 ring-border/70 clay-shadow"><div className="absolute inset-0 bg-linear-to-br from-indigo/10 via-transparent to-violet/15" /><svg className="absolute inset-0 size-full opacity-25" viewBox="0 0 500 500" aria-hidden="true"><path d="M100 120 L250 250 L390 145 M100 380 L250 250 L410 360 M100 120 L410 360 M100 380 L390 145" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet" /><circle cx="100" cy="120" r="7" fill="currentColor" className="text-indigo" /><circle cx="390" cy="145" r="7" fill="currentColor" className="text-violet" /><circle cx="100" cy="380" r="7" fill="currentColor" className="text-rose" /><circle cx="410" cy="360" r="7" fill="currentColor" className="text-blue" /></svg><div className="absolute left-1/2 top-1/2 z-10 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] bg-linear-to-br from-indigo to-violet font-mono text-2xl font-bold text-primary-foreground clay-shadow">AI</div><Node label="ML" position="left-8 top-8" tone="mint" /><Node label="SQL" position="right-8 top-16" tone="amber" /><Node label="DS" position="bottom-16 left-12" tone="rose" /><Node label="Gen" position="bottom-8 right-14" tone="blue" /><span className="absolute left-6 top-1/2 size-6 rounded-xl bg-ink/80 clay-shadow-sm" /><span className="absolute right-1/3 top-1/3 size-5 rounded-lg bg-violet/70" /></div><div className="absolute -bottom-5 -left-5 rounded-2xl bg-card px-5 py-3 ring-1 ring-border/70 clay-shadow-sm"><p className="font-mono text-[11px] text-muted-foreground">neural.active</p><p className="text-sm font-bold">Data Pipeline</p></div></motion.div>;
}

function Node({ label, position, tone }: { label: string; position: string; tone: string }) { return <div className={cn("float-node absolute grid size-14 place-items-center rounded-2xl font-mono text-xs font-bold clay-shadow-sm", position, toneClasses[tone])}>{label}</div>; }

function SectionHeading({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: string }) { return <div className="mb-8 flex items-end justify-between gap-6"><div><p className="mb-1 font-mono text-sm text-indigo">{eyebrow}</p><h2 className="font-display text-3xl font-medium md:text-4xl">{title}</h2></div>{aside && <p className="hidden max-w-xs text-right text-sm text-muted-foreground md:block">{aside}</p>}</div>; }

function FocusCard({ icon, title, description, tone }: { icon: React.ReactNode; title: string; description: string; tone: "indigo" | "violet" | "mint" }) { return <motion.article whileHover={{ y: -5 }} className="rounded-3xl bg-card p-7 ring-1 ring-border/70 clay-shadow"><div className={cn("mb-5 grid size-13 place-items-center rounded-2xl", focusToneClasses[tone])}>{icon}</div><h3 className="mb-2 text-lg font-bold">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></motion.article>; }

function SkillCard({ group }: { group: (typeof skillGroups)[number] }) { return <article className="rounded-3xl bg-card p-6 ring-1 ring-border/70 clay-shadow"><p className={cn("font-mono text-xs", skillToneClasses[group.tone])}>{group.name}</p><ul className="mt-4 space-y-3">{group.skills.map((skill) => <li key={skill.name} className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 text-sm last:border-0 last:pb-0"><span>{skill.name}</span><span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[10px] text-muted-foreground">{skill.level}</span></li>)}</ul></article>; }

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) { return <motion.article whileHover={{ y: -5 }} className="group rounded-3xl bg-card p-4 ring-1 ring-border/70 clay-shadow"><div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-indigo/10"><img src={project.image} alt={`${project.title} abstract project artwork`} width={1024} height={768} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-mono text-indigo ring-1 ring-border/60">{project.category}</span></div><div className="px-2 pb-2"><h3 className="mt-1 text-lg font-bold">{project.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium">{technology}</span>)}</div><div className="mt-5 flex items-center justify-between gap-3"><Button type="button" variant="link" className="h-auto p-0 text-sm font-semibold text-indigo" onClick={onOpen}>View Details <ChevronRight aria-hidden="true" /></Button><span className="font-mono text-[11px] text-muted-foreground">Coming Soon</span></div></div></motion.article>; }

function ResumePanel({ onDownload }: { onDownload: () => void }) { return <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-linear-to-br from-indigo/15 via-card to-violet/15 p-8 ring-1 ring-border/70 clay-shadow md:flex-row md:items-center md:p-10"><div><p className="font-mono text-sm text-indigo">A little more context</p><h2 className="mt-2 font-display text-3xl">Want to know more about me?</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Explore my resume to learn more about my education, skills, projects and learning journey.</p></div><Button type="button" className="shrink-0 rounded-2xl bg-ink text-primary-foreground" onClick={onDownload}><FileDown aria-hidden="true" /> Download Resume</Button></div>; }

function ContactLink({ Icon, label, value }: { Icon: typeof Mail; label: string; value: string }) { const available = Boolean(value); return <div className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border/70 clay-shadow-sm"><span className="grid size-10 place-items-center rounded-xl bg-indigo/10 text-indigo"><Icon aria-hidden="true" /></span><div><p className="text-sm font-semibold">{label}</p>{available ? <a className="text-sm text-indigo hover:underline" href={label === "Email" ? `mailto:${value}` : value} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noreferrer"}>{value}</a> : <p className="text-sm text-muted-foreground">Coming Soon</p>}</div></div>; }

function ContactForm() { const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle"); const [form, setForm] = useState({ name: "", email: "", message: "" }); const [errors, setErrors] = useState<Record<string, string>>({}); const endpoint = import.meta.env["VITE_CONTACT_ENDPOINT"] as string | undefined; const submit = async (event: React.FormEvent) => { event.preventDefault(); const nextErrors: Record<string, string> = {}; if (!form.name.trim()) nextErrors.name = "Please enter your name."; if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = "Please enter a valid email."; if (form.message.trim().length < 20) nextErrors.message = "Please write at least 20 characters."; setErrors(nextErrors); if (Object.keys(nextErrors).length) return; setStatus("submitting"); if (!endpoint) { await new Promise((resolve) => window.setTimeout(resolve, 550)); setStatus("error"); return; } try { const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); if (!response.ok) throw new Error("Request failed"); setForm({ name: "", email: "", message: "" }); setStatus("success"); } catch { setStatus("error"); } }; return <form onSubmit={submit} className="rounded-3xl bg-card p-6 ring-1 ring-border/70 clay-shadow md:p-8" noValidate><div className="flex items-center justify-between gap-4"><div><p className="font-mono text-sm text-indigo">Send a note</p><h3 className="mt-1 font-display text-2xl">Start a conversation</h3></div><Terminal className="size-6 text-violet" aria-hidden="true" /></div><div className="mt-6 grid gap-5"><Field label="Name" id="contact-name" value={form.name} error={errors["name"]} onChange={(value) => setForm((current) => ({ ...current, name: value }))} /><Field label="Email" id="contact-email" type="email" value={form.email} error={errors["email"]} onChange={(value) => setForm((current) => ({ ...current, email: value }))} /><div><label htmlFor="contact-message" className="text-sm font-semibold">Message</label><textarea id="contact-message" rows={5} value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} className="mt-2 w-full resize-y rounded-2xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring" aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "contact-message-error" : undefined} />{errors["message"] && <p id="contact-message-error" className="mt-1 text-xs text-destructive" role="alert">{errors["message"]}</p>}</div></div>{status === "success" && <p className="mt-4 flex items-center gap-2 text-sm text-emerald-700 dark:text-mint" role="status"><Check className="size-4" /> Message submitted successfully.</p>}{status === "error" && <p className="mt-4 text-sm text-destructive" role="alert">Your message was not sent. Contact delivery is not configured yet, so please try again later.</p>}<Button type="submit" className="mt-6 rounded-2xl bg-ink text-primary-foreground" disabled={status === "submitting"}>{status === "submitting" ? "Checking…" : "Send Message"} <ChevronRight aria-hidden="true" /></Button></form>; }

function Field({ label, id, type = "text", value, error, onChange }: { label: string; id: string; type?: string; value: string; error?: string | undefined; onChange: (value: string) => void }) { return <div><label htmlFor={id} className="text-sm font-semibold">{label}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error && <p id={`${id}-error`} className="mt-1 text-xs text-destructive" role="alert">{error}</p>}</div>; }

function CommandPalette({ open, onClose, onGoTo, onToggleTheme, onDownload }: { open: boolean; onClose: () => void; onGoTo: (id: string) => void; onToggleTheme: () => void; onDownload: () => void }) { const [query, setQuery] = useState(""); const inputRef = useRef<HTMLInputElement>(null); const commands = [...navItems.map(([label, id]) => ({ label: `Go to ${label}`, action: () => onGoTo(id), icon: ArrowDown })), { label: "Download Resume", action: onDownload, icon: FileDown }, { label: "Toggle Theme", action: onToggleTheme, icon: Moon }]; const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())); useEffect(() => { if (open) { setQuery(""); window.setTimeout(() => inputRef.current?.focus(), 0); } }, [open]); if (!open) return null; return <div className="fixed inset-0 z-50 grid place-items-start bg-ink/30 p-4 pt-[15vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="w-full max-w-xl overflow-hidden rounded-3xl bg-card ring-1 ring-border clay-shadow"><div className="flex items-center gap-3 border-b border-border/70 px-5 py-4"><Command className="size-5 text-indigo" aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") onClose(); if (event.key === "Enter" && filtered[0]) { filtered[0].action(); onClose(); } }} placeholder="Search commands…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" aria-label="Search commands" /><kbd className="hidden rounded-md bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground sm:block">ESC</kbd></div><div className="max-h-80 overflow-y-auto p-2">{filtered.map((command) => { const Icon = command.icon; return <button type="button" key={command.label} onClick={() => { command.action(); onClose(); }} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-colors hover:bg-surface"><Icon className="size-4 text-indigo" aria-hidden="true" /><span>{command.label}</span><ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" /></button>; })}{!filtered.length && <p className="px-4 py-8 text-center text-sm text-muted-foreground">No commands found.</p>}</div><div className="flex items-center gap-2 border-t border-border/70 px-5 py-3 text-[11px] text-muted-foreground"><Keyboard className="size-3.5" aria-hidden="true" /> Press Enter to run a command</div></div></div>; }

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) { useEffect(() => { if (!project) return; const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); }; }, [onClose, project]); if (!project) return null; return <div className="fixed inset-0 z-50 grid place-items-center bg-ink/30 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-card ring-1 ring-border clay-shadow"><Button type="button" variant="ghost" size="icon" className="absolute right-4 top-4 z-10 rounded-full bg-card/90" onClick={onClose} aria-label="Close project details"><X aria-hidden="true" /></Button><img src={project.image} alt={`${project.title} project artwork`} width={1024} height={768} className="aspect-[16/7] w-full object-cover" /><div className="p-6 md:p-8"><p className="font-mono text-sm text-indigo">{project.category}</p><h2 id="project-dialog-title" className="mt-2 font-display text-3xl">{project.title}</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.description}</p><div className="mt-8 grid gap-6 md:grid-cols-2"><DetailBlock label="Problem statement" text={project.problem} /><DetailBlock label="Solution" text={project.solution} /><DetailList label="Features" items={project.features} /><DetailList label="Learning outcomes" items={project.learningOutcomes} /></div><div className="mt-8 flex flex-wrap items-center gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium">{technology}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><Button type="button" variant="outline" className="rounded-2xl" disabled={!project.github}>{project.github ? <><Github /> GitHub <ExternalLink /></> : "GitHub · Coming Soon"}</Button><Button type="button" variant="outline" className="rounded-2xl" disabled={!project.liveDemo}>{project.liveDemo ? <><ExternalLink /> Live Demo</> : "Live Demo · Coming Soon"}</Button></div></div></motion.div></div>; }

function DetailBlock({ label, text }: { label: string; text: string }) { return <div><h3 className="font-semibold">{label}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>; }
function DetailList({ label, items }: { label: string; items: string[] }) { return <div><h3 className="font-semibold">{label}</h3><ul className="mt-2 space-y-2 text-sm text-muted-foreground">{items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-indigo" />{item}</li>)}</ul></div>; }

async function downloadResume(path: string) { try { const response = await fetch(path, { method: "HEAD" }); if (!response.ok) throw new Error("Missing resume"); const anchor = document.createElement("a"); anchor.href = path; anchor.download = "Prince-Shourya-Resume.pdf"; anchor.click(); } catch { window.alert("Resume Coming Soon"); } }